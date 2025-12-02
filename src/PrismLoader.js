import Prism from "prismjs";
import PrismLoader from "prismjs/components/index.js";

// Avoid "Language does not exist: " console logs
PrismLoader.silent = true;

import "prismjs/components/prism-diff.js";

// Load diff-highlight plugin
import "prismjs/plugins/diff-highlight/prism-diff-highlight.js";

import PrismAlias from "./PrismNormalizeAlias.js";

export default  function(language, options = {}) {
  let diffRemovedRawName = language;
  if(language.startsWith("diff-")) {
    diffRemovedRawName = language.substr("diff-".length);
  }
  // aliasing should ignore diff-
  let aliasedName = PrismAlias(diffRemovedRawName);

  if(!Prism.languages[ aliasedName ]) { // matches `diff` too
    PrismLoader(aliasedName);
  }

  if(options.errorOnInvalidLanguage && !Prism.languages[ aliasedName ]) {
    throw new Error(`"${language}" is not a valid Prism.js language for eleventy-plugin-syntaxhighlight`);
  }

  if(!language.startsWith("diff-")) {
    return Prism.languages[ aliasedName ];
  }

  // language has diff- prefix
  let fullLanguageName = `diff-${aliasedName}`;

  // Store into with aliased keys
  //   ts -> diff-typescript
  //   js -> diff-javascript
  Prism.languages[ fullLanguageName ] = Prism.languages.diff;

  return Prism.languages[ fullLanguageName ];
};
