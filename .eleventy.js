const plainHighlighter = require("./src/syntaxHighlightPlain");
const prismjsHighlighter = require("./src/syntaxHighlightPrism");

module.exports = function(eleventyConfig) {
  // compatibility with existing {% highlight js %} and others
  eleventyConfig.addLiquidTag("highlight", prismjsHighlighter);

  eleventyConfig.addLiquidTag("highlight-plain", plainHighlighter);
};
