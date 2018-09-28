const HighlightLines = require("./HighlightLines");

class HighlightLinesGroup {
  constructor(str, delimiter) {
    this.init(str, delimiter);
  }

  init(str = "", delimiter = " ") {
    this.str = str;
    this.delimiter = delimiter;

    let split = str.split(this.delimiter);
    this.highlights = new HighlightLines(split.length === 1 ? split[0] : "");
    this.highlightsAdd = new HighlightLines(split.length === 2 ? split[0] : "");
    this.highlightsRemove = new HighlightLines(split.length === 2 ? split[1] : "");
  }

  isHighlighted(lineNumber) {
    return this.highlights.isHighlighted(lineNumber);
  }

  isHighlightedAdd(lineNumber) {
    return this.highlightsAdd.isHighlighted(lineNumber);
  }

  isHighlightedRemove(lineNumber) {
    return this.highlightsRemove.isHighlighted(lineNumber);
  }

  getLineMarkup(lineNumber, line, extraClasses = []) {
    let extraClassesStr = (extraClasses.length ? " " + extraClasses.join(" ") : "");

    if (this.isHighlighted(lineNumber)) {
      return `<mark class="highlight-line highlight-line-active${extraClassesStr}">${line}</mark>`;
    }
    if (this.isHighlightedAdd(lineNumber)) {
      return `<ins class="highlight-line highlight-line-add${extraClassesStr}">${line}</ins>`;
    }
    if (this.isHighlightedRemove(lineNumber)) {
      return `<del class="highlight-line highlight-line-remove${extraClassesStr}">${line}</del>`;
    }

    return `<span class="highlight-line${extraClassesStr}">${line}</span>`;
  }
}

module.exports = HighlightLinesGroup;
