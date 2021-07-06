const fs = require("fs");

module.exports = function (config) {
  // Tailwind
  config.addWatchTarget("_site/static/tailwind.css");
  
  // Alpine
  config.addPassthroughCopy({
    "node_modules/alpinejs/dist/alpine.js": "static/alpine.js",
  });

  // Static
  config.addPassthroughCopy("static");

  // 404 support in `eleventy serve`
  config.setBrowserSyncConfig({
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
