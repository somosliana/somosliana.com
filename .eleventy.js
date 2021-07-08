const fs = require("fs");
const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (config) {
  // Merge data instead of overriding
  config.setDataDeepMerge(true);

  config.addPassthroughCopy({
    "node_modules/alpinejs/dist/alpine.js": "alpine.js",
    "./netlifycms.yml": "./admin/config.yml",
    "node_modules/prismjs/themes/prism-tomorrow.css": "prism-tomorrow.css",
  });
  config.addPassthroughCopy("www/static");

  // human readable date
  config.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });
  // Syntax Highlighting for Code blocks
  config.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  config.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  // 404 support in `eleventy serve`
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        const content_404 = fs.readFileSync("public/404.html");
        bs.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  return {
    dir: {
      input: "www",
      output: "public",
    },
  };
};
