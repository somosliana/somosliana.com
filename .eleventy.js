const minifyHtml = require('./src/minifyHtml')
const browsersyncConfig = require('./src/browsersyncConfig')
const pluginSEO = require('eleventy-plugin-seo')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const yaml = require('js-yaml')
const { DateTime } = require('luxon')

module.exports = function (config) {
  // Extensions
  config.addDataExtension('yaml', (contents) => yaml.safeLoad(contents))

  // Plugins
  config.addPlugin(pluginSEO, require('./www/_data/seo.json'))
  config.addPlugin(syntaxHighlight)

  // Filters
  config.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy')
  })

  // Copy files
  config.addPassthroughCopy({
    './node_modules/alpinejs/dist/alpine.js': 'alpine.js',
    './netlifycms.yml': './admin/config.yml',
    './node_modules/prismjs/themes/prism-tomorrow.css': 'prism-tomorrow.css',
    './www/static': 'static',
  })

  // Conditional configs
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    config.addTransform('minifyHtml', minifyHtml)
  } else {
    config.setBrowserSyncConfig(browsersyncConfig)
  }

  return {
    // Directory structure
    dir: {
      input: 'www',
      output: 'public',
      layouts: '_layouts'
    },
  }
}
