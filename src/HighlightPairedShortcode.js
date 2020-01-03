const Prism = require("prismjs");
const PrismLoader = require("./PrismLoader");
const HighlightLinesGroup = require("./HighlightLinesGroup");

module.exports = function(content, language, highlightNumbers, options = {}) {
  let highlightedContent;
  if( language === "text" ) {
    highlightedContent = content.trim();
  } else {
    highlightedContent = Prism.highlight(content.trim(), PrismLoader(language), language);
  }

  let group = new HighlightLinesGroup(highlightNumbers);
  let lines = highlightedContent.split("\n");
  lines = lines.map(function(line, j) {
    if(options.alwaysWrapLineHighlights || highlightNumbers) {
      let lineContent = group.getLineMarkup(j, line);
      return lineContent;
    }
    return line;
  });

  return `<pre class="language-${language}"><code class="language-${language}">` + lines.join("<br>") + "</code></pre>";
};
