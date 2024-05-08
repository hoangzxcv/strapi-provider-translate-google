const { TranslationServiceClient } = require('@google-cloud/translate').v3;

module.exports = {
    provider: 'google',
    name: 'Google Translate',
    async init(providerOptions = {}, pluginConfig = {}) {
        // Retrieve API key and project ID from environment variables
        const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
        const projectId = process.env.GOOGLE_PROJECT_ID;

        if (!apiKey || !projectId) {
            throw new Error('Google Translate API key or project ID is missing.');
        }

        // Initialize Google Translate client
        const translationClient = new TranslationServiceClient({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            projectId,
        });

        return {
            async translate({ text, sourceLocale, targetLocale, priority, format = 'plain' }) {
                try {
                    const [response] = await translationClient.translateText({
                        parent: `projects/${projectId}/locations/global`,
                        contents: Array.isArray(text) ? text : [text],
                        mimeType: `text/${format}`,
                        sourceLanguageCode: sourceLocale,
                        targetLanguageCode: targetLocale,
                        model: 'general',
                    });

                    const translations = response.translations.map((translation) => translation.translatedText);
                    return Array.isArray(text) ? translations : translations[0];
                } catch (error) {
                    console.error('Google Translate Error:', error);
                    return Array.isArray(text) ? text.map((t) => `${t} (Translation Error)`) : `${text} (Translation Error)`;
                }
            },
            async usage() {
                // Google Translate API does not provide usage information
                return { count: -1, limit: -1 };
            },
        };
    },
};
