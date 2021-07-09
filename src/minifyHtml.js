const htmlmin = require('html-minifier')

module.exports = (content, outputPath) => {
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
