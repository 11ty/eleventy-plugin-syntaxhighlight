function LineNumbers(lineCount) {
  let lineNumbersWrapper = "";
  if (!lineCount) {
    return "";
  }

  const linesNum = lineCount;

  const lines = new Array(linesNum + 1).join("<span></span>");
  lineNumbersWrapper = `<span aria-hidden="true" class="line-numbers-rows">${lines}</span>`;

  return lineNumbersWrapper;
}

module.exports = LineNumbers;
