const Prism = require("prismjs");
const PrismLoader = require("prismjs/components/index.js");
// Avoid "Language does not exist: " console logs
PrismLoader.silent = true;

const PrismAlias = require("./PrismNormalizeAlias");

module.exports = function(language) {
  let diffRemovedRawName = language;
  if(language.startsWith("diff-")) {
    diffRemovedRawName = language.substr("diff-".length);
  }
  let diffRemovedNormalizedName = PrismAlias(diffRemovedRawName);

  if(!Prism.languages[ diffRemovedNormalizedName ]) {
    PrismLoader(diffRemovedNormalizedName);
  }
  if(!Prism.languages[ diffRemovedNormalizedName ]) {
    throw new Error(`"${language}" is not a valid Prism.js language for eleventy-plugin-syntaxhighlight`);
  }
  if(!language.startsWith("diff-")) {
    return Prism.languages[ diffRemovedNormalizedName ];
  }

  let fullLanguageName = `diff-${diffRemovedNormalizedName}`;

  if(!Prism.languages.diff) {
    PrismLoader("diff");
    // Bundled Plugin
    require("prismjs/plugins/diff-highlight/prism-diff-highlight");
  }

  // Store into with aliased keys
  //   ts -> diff-typescript
  //   js -> diff-javascript
  Prism.languages[ fullLanguageName ] = Prism.languages.diff;

  return Prism.languages[ fullLanguageName ];
};
