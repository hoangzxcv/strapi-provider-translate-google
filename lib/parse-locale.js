'use strict'

const defaults = require('lodash/defaults')

const defaultLocaleMap = {
  ES: 'ES-SV',
  EN: 'EN-US',
}

function stripAndUpper(locale) {
  const unstripped = locale.toUpperCase()
  const stripped = unstripped.split('-')[0]

  return { unstripped, stripped }
}

function parseLocale(strapiLocale, localeMap = {}, direction = 'target') {
  const { unstripped, stripped } = stripAndUpper(strapiLocale)

  defaults(localeMap, defaultLocaleMap)

  let possiblyUnstrippedResult = stripped
  switch (stripped) {
    case 'ES':
    case 'EN':
      possiblyUnstrippedResult = localeMap[stripped] || stripped
      break
    default:
      if (localeMap[stripped]) possiblyUnstrippedResult = localeMap[stripped]
      else if (localeMap[unstripped])
        possiblyUnstrippedResult = localeMap[unstripped]
      else if (localeMap[strapiLocale])
        possiblyUnstrippedResult = localeMap[strapiLocale]
      else throw new Error('unsupported locale')
  }
  if (direction === 'source') {
    return stripAndUpper(possiblyUnstrippedResult).stripped
  }
  return possiblyUnstrippedResult
}

module.exports = {
  parseLocale,
}