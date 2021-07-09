const minifyHtml = require('./src/minifyHtml')
const browsersyncConfig = require('./src/browsersyncConfig')
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const pluginSEO = require("eleventy-plugin-seo");


const isProduction = process.env.NODE_ENV === 'production'

module.exports = function (config) {
  config.addPassthroughCopy({
    './node_modules/alpinejs/dist/alpine.js': 'alpine.js',
    './netlifycms.yml': './admin/config.yml',
    './node_modules/prismjs/themes/prism-tomorrow.css': 'prism-tomorrow.css',
    './www/static': 'static'
  })

  config.addPlugin(lazyImagesPlugin);
  config.addPlugin(pluginSEO, require("./www/_data/seo.json"));

  if (isProduction) {
    config.addTransform('minifyHtml', minifyHtml)
  } else {
    config.setBrowserSyncConfig(browsersyncConfig)
  }

  return {
    dir: {
      input: 'www',
      output: 'public',
    },
  }
}
