const liquidPlain = require("./src/liquidSyntaxHighlightPlain");
const liquidPrismJs = require("./src/liquidSyntaxHighlightPrism");
const markdownPrismJs = require("./src/markdownSyntaxHighlight");

module.exports = function(eleventyConfig, pluginNamespace) {
  eleventyConfig.namespace(pluginNamespace, () => {
    // compatibility with existing {% highlight js %} and others
    eleventyConfig.addLiquidTag("highlight", liquidPrismJs);
    eleventyConfig.addMarkdownHighlighter(markdownPrismJs);

    // Deprecated, use {% highlight text %} instead.
    eleventyConfig.addLiquidTag("highlight-plain", liquidPlain);
  });
};
