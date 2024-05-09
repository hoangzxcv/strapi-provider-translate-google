'use strict'

const { Translate } = require('@google-cloud/translate').v2;
const Bottleneck = require('bottleneck/es5')
const {
  GOOGLE_API_MAX_TEXTS,
  GOOGLE_API_ROUGH_MAX_REQUEST_SIZE,
  GOOGLE_PRIORITY_DEFAULT,
} = require('./constants')
const { parseLocale } = require('./parse-locale')
const { getService } = require('./get-service')

module.exports = {
  provider: 'google',
  name: 'Google Translate',

  init(providerOptions = {}) {
    const apiKey = process.env.GOOGLE_API_KEY || providerOptions.apiKey;
    const projectId = process.env.GOOGLE_PROJECT_ID || providerOptions.projectId;

    const localeMap =
      typeof providerOptions.localeMap === 'object'
        ? providerOptions.localeMap
        : {}
    const apiOptions =
      typeof providerOptions.apiOptions === 'object'
        ? providerOptions.apiOptions
        : {}

    const client = new Translate({ projectId, key: apiKey });

    const limiter = new Bottleneck({
      minTime: process.env.NODE_ENV == 'test' ? 10 : 200,
      maxConcurrent: 5,
    })

    const rateLimitedTranslate = limiter.wrap(async (text, target) => {
      const [response] = await client.translate(text, target);
      return response;
    });

    return {
      /**
       * @param {{
       *  text:string|string[],
       *  sourceLocale: string,
       *  targetLocale: string,
       *  priority: number,
       *  format?: 'plain'|'markdown'|'html'
       * }} options all translate options
       * @returns {string[]} the input text(s) translated
       */
      async translate({ text, priority, sourceLocale, targetLocale, format }) {
        if (!text) {
          return []
        }
        if (!sourceLocale || !targetLocale) {
          throw new Error('source and target locale must be defined')
        }

        const chunksService = getService('chunks')
        const formatService = getService('format')

        const tagHandling = format === 'plain' ? undefined : 'html'

        let textArray = Array.isArray(text) ? text : [text]

        if (format === 'markdown') {
          textArray = formatService.markdownToHtml(textArray)
        }

        const { chunks, reduceFunction } = chunksService.split(textArray, {
          maxLength: GOOGLE_API_MAX_TEXTS,
          maxByteSize: GOOGLE_API_ROUGH_MAX_REQUEST_SIZE
        })

        const result = reduceFunction(
          await Promise.all(
            chunks.map(async (texts) => {
              return await rateLimitedTranslate.withOptions(
                {
                  priority:
                    typeof priority == 'number'
                      ? priority
                      : GOOGLE_PRIORITY_DEFAULT,
                },
                texts,
                parseLocale(targetLocale, localeMap, 'target'),
                { ...apiOptions, tagHandling }
              )
            })
          )
        )

        if (format === 'markdown') {
          return formatService.htmlToMarkdown(result)
        }

        return result
      },
      async usage() {
        return { count: 0, limit: 0 };
      },
    }
  },
}
