const fs = require("fs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("_site/tailwind.css");

  eleventyConfig.addPassthroughCopy({
    "node_modules/alpinejs/dist/alpine.js": "alpine.js",
  });

  eleventyConfig.addPassthroughCopy({
    "node_modules/@fortawesome/fontawesome-free/sprites": "static/sprites",
  });

  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  eleventyConfig.addPassthroughCopy("admin");


  // 404 support in `eleventy serve`
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
     ready: function(err, bs) {
       const content_404 = fs.readFileSync('_site/404.html');
       bs.addMiddleware("*", (req, res) => {
        // Provides the 404 content without redirect.
        res.write(content_404);
        res.end();
      });
     }
    }
  });

  return {
    dir: {
      input: "_pages",
      includes: "../_includes",
      data: "../_data",
    },
  };
};
