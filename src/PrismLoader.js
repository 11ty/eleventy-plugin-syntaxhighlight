const Prism = require("prismjs");
const PrismLoader = require("prismjs/components/index.js");
const PrismAlias = require("./PrismNormalizeAlias");

module.exports = function(language) {
  if(language.startsWith("diff-") && !Prism.languages.diff) {
    PrismLoader("diff");
    return Prism.languages.diff;
  }

  let normalizedLanguage = PrismAlias(language);
  if(!Prism.languages[ normalizedLanguage ]) {
    PrismLoader(normalizedLanguage);
  }
  if(!Prism.languages[normalizedLanguage]) {
    throw new Error(`"${language}" is not a valid Prism.js language for eleventy-plugin-syntaxhighlight`);
  }
  return Prism.languages[ normalizedLanguage ];
};
