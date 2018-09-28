const Prism = require("prismjs");
const PrismLoader = require("prismjs/components/index.js");
const HighlightLinesGroup = require("./HighlightLinesGroup");

module.exports = function(content, language, highlightNumbers) {
  let highlightedContent;
  if( language === "text" ) {
    highlightedContent = content.trim();
  } else {
    if( !Prism.languages[ language ] ) {
      PrismLoader([language]);
    }

    highlightedContent = Prism.highlight(content.trim(), Prism.languages[ language ]);
  }

  let group = new HighlightLinesGroup(highlightNumbers);

  let lines = highlightedContent.split("\n").map(function(line, j) {
    return group.getLineMarkup(j, line);
  });

  return `<pre class="language-${language}"><code class="language-${language}">` + lines.join("<br>") + "</code></pre>";
};
