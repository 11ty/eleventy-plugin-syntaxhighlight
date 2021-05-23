const Prism = require("prismjs");
const PrismLoader = require("./PrismLoader");
const HighlightLinesGroup = require("./HighlightLinesGroup");
const getAttributes = require("./getAttributes");

module.exports = function (content, language, highlightNumbers, options = {}) {
  const preAttributes = getAttributes(options.preAttributes);
  const codeAttributes = getAttributes(options.codeAttributes);

  // default to on
  if(options.trim === undefined || options.trim === true) {
    content = content.trim();
  }

  let highlightedContent;
  if( language === "text" ) {
    highlightedContent = content;
  } else {
    highlightedContent = Prism.highlight(content, PrismLoader(language), language);
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

  return `<pre class="language-${language}"${preAttributes}><code class="language-${language}"${codeAttributes}>` + lines.join(options.lineSeparator || "<br>") + "</code></pre>";
};
