import syntaxHighlight from "../syntaxHighlight.js";

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {
    // alwaysWrapLineHighlights: true
    preAttributes: { tabindex: 0 }
  });

  eleventyConfig.setTemplateFormats("njk,liquid,md,css");
};
