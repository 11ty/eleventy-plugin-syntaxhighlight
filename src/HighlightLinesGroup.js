const HighlightLines = require("./HighlightLines");

class HighlightLinesGroup {
  constructor(str, delimiter) {
    this.init(str, delimiter);
  }

  init(str, delimiter) {
    this.str = str;
    this.delimiter = delimiter || " ";

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
}

module.exports = HighlightLinesGroup;
