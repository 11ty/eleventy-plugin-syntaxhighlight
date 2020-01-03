const Prism = require("prismjs");

module.exports = function(language) {
  try {
    const PrismComponents = require("prismjs/components.json");
    let langs = PrismComponents.languages;

    if(langs[ language ]) {
      return language;
    }
    for(let langName in langs) {
      if(Array.isArray(langs[langName].alias)) {
        for(let alias of langs[langName].alias) {
          if(alias === language) {
            return langName;
          }
        }
      } else if(langs[langName].alias === language) {
        return langName;
      }
    }
  } catch(e) {
    // Couldn’t find the components file, aliases may not resolve correctly
    // See https://github.com/11ty/eleventy-plugin-syntaxhighlight/issues/19
  }

  return language;
}
