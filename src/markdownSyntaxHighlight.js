const Prism = require("prismjs");
const PrismLoader = require("prismjs/components/index.js");
const HighlightLinesGroup = require("./HighlightLinesGroup");
const LineNumbers = require("./LineNumbers");

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

  let lines = html.split("\n").slice(0, -1); // The last line is empty.
  let highlightedLines = lines.map(function(line, j) {
    return highlights.getLineMarkup(j, line);
  });


  // Not sure how to configure this on/off
  const numberLines = LineNumbers(highlightedLines.length);
  const preClasses = [
    `language-${language}`,
  ];
  if (numberLines !== "") {
    preClasses.push("line-numbers");
  }

  return `<pre class="${preClasses.join(" ")}"><code class="language-${language}">${highlightedLines.join("<br>")}${numberLines}</code></pre>`;
};
