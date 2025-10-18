import pkg from "./package.json" with { type: "json" };
import Prism from "prismjs";
import PrismLoader from "./src/PrismLoader.js";
import hasTemplateFormat from "./src/hasTemplateFormat.js";
import HighlightPairedShortcode from "./src/HighlightPairedShortcode.js";
import markdownPrismJs from "./src/markdownSyntaxHighlightOptions.js";

export default function(eleventyConfig, options){
  try {
    eleventyConfig.versionCheck(pkg["11ty"].compatibility);
  } catch(e) {
    console.log( `WARN: Eleventy Plugin (${pkg.name}) Compatibility: ${e.message}` );
  }
  options = Object.assign({
    init: function({Prism}){},
    lineSeparator: "\n",
    errorOnInvalidLanguage: false,
    alwaysWrapLineHighlights: false,
    preAttributes: {},
    codeAttributes: {},
    languages: [],
  }, options);

  for(const language of options.languages){
    PrismLoader(language)
  }

  function shortcodeFunction(content, args) {
    // {% highlight "js 0 2-3" %}
    let [language, ...highlightNumbers] = (args || "").split(" ");
    return HighlightPairedShortcode(content, language, highlightNumbers.join(" "), options);
  }


  if( hasTemplateFormat(options.templateFormats, "liquid") ) {
    eleventyConfig.addPairedLiquidShortcode("highlight", shortcodeFunction);
  }

  if( hasTemplateFormat(options.templateFormats, "njk") ) {
    eleventyConfig.addPairedNunjucksShortcode("highlight", shortcodeFunction);
  }

  if( hasTemplateFormat(options.templateFormats, "md") ) {
    // ```js/0,2-3
    // TODO swap to amendLibrary
    eleventyConfig.addMarkdownHighlighter(markdownPrismJs(options));
  }

  // we need to add this as many template languages (WebC) rely on JavaScript functions (not just 11ty.js)
  // Note the argument order for language, content (differs from shortcode)
  eleventyConfig.addJavaScriptFunction("highlight", (language, content, ...highlightLines) => {
    return HighlightPairedShortcode(content, language, highlightLines.join(" "), options);
  });

  options.init({Prism})
};

export { HighlightPairedShortcode as pairedShortcode };
