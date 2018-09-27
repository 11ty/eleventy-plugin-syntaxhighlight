const Prism = require("prismjs");
const PrismLoader = require("prismjs/components/index.js");
const LiquidHighlight = require( "./LiquidHighlight" );

module.exports = function(liquidEngine) {
  let highlight = new LiquidHighlight(liquidEngine);

  highlight.addHook(function(language, htmlStr, lines) {
    if( language === "text" ) {
      return htmlStr;
    } else {
      if( !Prism.languages[ language ] ) {
        PrismLoader([language]);
      }

      return Prism.highlight(htmlStr, Prism.languages[ language ]);
    }
  });

  return highlight.getObject();
};
