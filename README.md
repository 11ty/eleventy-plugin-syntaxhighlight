# eleventy-plugin-syntaxhighlight

To show line numbers, set the `showLineNumbers` option to true.
This is a global setting.

```
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true,
    showLineNumbers: false
  });

  eleventyConfig.setTemplateFormats("njk,liquid,md,css");
};
```

A pack of [Eleventy](https://github.com/11ty/eleventy) plugins for syntax highlighting. No browser/client JavaScript here, these highlight transformations are all done at build-time.

## Read the [Full Documentation on 11ty.dev](https://www.11ty.dev/docs/plugins/syntaxhighlight/)

