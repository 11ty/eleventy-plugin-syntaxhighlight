const Prism = require("prismjs");
const PrismLoader = require("prismjs/components/index.js");
const HighlightLinesGroup = require("./HighlightLinesGroup");

module.exports = function(str, language) {
  if(!language) {
    // empty string means defer to the upstream escaping code built into markdown lib.
    return "";
  }

  let split = language.split("/");
  if( split.length ) {
    language = split.shift();
  }

  let html;
  if(language === "text") {
    html = str;
  } else {
    if( !Prism.languages[ language ] ) {
      PrismLoader([language]);
    }

    html = Prism.highlight(str, Prism.languages[ language ], language);
  }

  let highlights = new HighlightLinesGroup(split.join("/"), "/");

  let lines = html.split("\n");
  let highlightedLines = lines.map(function(line, j) {
    if( j + 1 === lines.length ) {
      return "";
    }

    return "<div class=\"highlight-line" +
      (highlights.isHighlighted(j) ? " highlight-line-active" : "") +
      (highlights.isHighlightedAdd(j) ? " highlight-line-add" : "") +
      (highlights.isHighlightedRemove(j) ? " highlight-line-remove" : "") +
      "\">" +
      line +
      "</div>";
  });

  return `<pre class="language-${language}"><code class="language-${language}">${highlightedLines.join("")}</code></pre>`;
};
