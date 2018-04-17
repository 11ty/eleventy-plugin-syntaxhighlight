const Prism = require('prismjs');
const LiquidHighlight = require( "./LiquidHighlight" );

module.exports = function(liquidEngine) {
  let highlight = new LiquidHighlight(liquidEngine);

  highlight.addHook(function(language, htmlStr, lines) {
    if( language === "text" ) {
      return htmlStr;
    } else {
      if (! Prism.languages[ language ]) {
        require(`prismjs/components/prism-${language}`);
      }
      return Prism.highlight(htmlStr, Prism.languages[ language ]);
    }
  });

  return highlight.getObject();
};
