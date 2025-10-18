import pkg from "./package.json" with { type: "json" };
import Prism from "prismjs";
import PrismLoader from "./src/PrismLoader.js";
import hasTemplateFormat from "./src/hasTemplateFormat.js";
import HighlightPairedShortcode from "./src/HighlightPairedShortcode.js";
import { LiquidHighlightTag } from "./src/LiquidHighlightTag.js";
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

  if( hasTemplateFormat(options.templateFormats, "liquid") ) {
    eleventyConfig.addLiquidTag("highlight", (liquidEngine) => {
      // {% highlight js 0 2 %}
      let highlight = new LiquidHighlightTag(liquidEngine);
      return highlight.getObject(options);
    });
  }

  if( hasTemplateFormat(options.templateFormats, "njk") ) {
    eleventyConfig.addPairedNunjucksShortcode("highlight", (content, args) => {
      // {% highlight "js 0 2-3" %}
      let [language, ...highlightNumbers] = args.split(" ");
      return HighlightPairedShortcode(content, language, highlightNumbers.join(" "), options);
    });
  }

  if( hasTemplateFormat(options.templateFormats, "md") ) {
    // ```js/0,2-3
    eleventyConfig.addMarkdownHighlighter(markdownPrismJs(options));
  }

  // we need to add this as many template languages (Vue, WebC) rely on JavaScript functions (not just 11ty.js)
  eleventyConfig.addJavaScriptFunction("highlight", (language, content, highlight1, highlight2) => {
    let highlightLines = [highlight1, highlight2].filter(entry => entry).join(" ");
    let result = HighlightPairedShortcode(content, language, highlightLines, options);
    return result;
  });

  options.init({Prism})
};

export { HighlightPairedShortcode as pairedShortcode };
