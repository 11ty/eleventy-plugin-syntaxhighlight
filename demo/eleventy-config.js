const syntaxHighlight = require("../.eleventy.js");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true,
    showLineNumbers: false
  });

  eleventyConfig.setTemplateFormats("njk,liquid,md,css");
};
