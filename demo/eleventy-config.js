const syntaxHighlight = require("../.eleventy.js");

console.log( syntaxHighlight.pairedShortcode );
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {
    // alwaysWrapLineHighlights: true
  });

  eleventyConfig.setTemplateFormats("njk,liquid,md,css");
};
