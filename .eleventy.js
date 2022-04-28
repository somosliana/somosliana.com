const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const yaml = require('js-yaml')
const { DateTime } = require('luxon')
const htmlmin = require('html-minifier')

module.exports = function (config) {
  // Extensions
  config.addDataExtension('yaml', (contents) => yaml.safeLoad(contents))

  // Plugins
  config.addPlugin(syntaxHighlight)

  // Filters
  config.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy')
  })

  // Copy files
  config.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.min.js': 'alpine.js',
    './netlifycms.yml': './admin/config.yml',
    './node_modules/prismjs/themes/prism-tomorrow.css': 'prism-tomorrow.css',
    './www/static': 'static',
  })

  // Conditional configs
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    config.addTransform('minifyHTML', minifyHTML)
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

function minifyHTML (content, outputPath) {
  const isHtml = outputPath.endsWith('.html')
  const config = {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
  }
  if (isHtml) {
    return htmlmin.minify(content, config)
  }
  return content
}