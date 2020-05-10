const Prism = require("prismjs");
const PrismLoader = require("./PrismLoader");
const HighlightLinesGroup = require("./HighlightLinesGroup");

module.exports = function(options = {}) {
  return function(str, language) {
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
      html = Prism.highlight(str, PrismLoader(language), language);
    }

        //  Prism's markdown highlighter renders tables
        //  with a newline before the end of the corresponding
        //  markdown line. It's hacky, but I'd rather
        //  fix it up here than figure out how to
        //  fix Prism's markdown highlighter

    if(language === 'markdown'){
      let wickedPattern=/<\/span>\n<\/span>/g
      let goodReplacement='</span></span>\n'
      html = html.replace(wickedPattern, goodReplacement)
    }

    let hasHighlightNumbers = split.length > 0;
    let highlights = new HighlightLinesGroup(split.join("/"), "/");

    let lines = html.split("\n")
      //  The last line is usually empty
      //  but not always -- such as tables
    if (lines[lines.length-1] === "")
      lines.pop()

    lines = lines.map(function(line, j) {
      if(options.alwaysWrapLineHighlights || hasHighlightNumbers) {
        let lineContent = highlights.getLineMarkup(j, line);
        return lineContent;
      }
      return line;
    });

    return `<pre class="language-${language}"><code class="language-${language}">${lines.join("<br>")}</code></pre>`;
  };
};
