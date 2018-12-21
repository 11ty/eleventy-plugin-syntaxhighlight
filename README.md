# eleventy-plugin-syntaxhighlight

A pack of [Eleventy](https://github.com/11ty/eleventy) plugins for syntax highlighting. No browser/client JavaScript here, these highlight transformations are all done at build-time.

## Installation

Available on [npm](https://www.npmjs.com/package/@11ty/eleventy-plugin-syntaxhighlight).

```
npm install @11ty/eleventy-plugin-syntaxhighlight --save
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

```
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
};
```

You are responsible for including [your favorite PrismJS theme CSS](https://github.com/PrismJS/prism-themes)!

Read more about [Eleventy plugins.](https://www.11ty.io/docs/plugins/)

### Options

Optionally pass in an options object as the second argument to `addPlugin` to further customize this plugin pack.

```
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {

    // Change which syntax highlighters are installed
    templateFormats: ["*"], // default

    // Or, just njk and md syntax highlighters (do not install liquid)
    // templateFormats: ["njk", "md"],

    // init callback lets you customize Prism
    init: function({ Prism }) {
      Prism.languages.myCustomLanguage = /* */;
    }
  });
};
```

## Usage

### This plugin provides:

* Markdown Highlighter: syntax highlights using PrismJS
* Liquid Custom Tag `{% highlight %}`: syntax highlights using PrismJS.
* Nunjucks Paired Shortcode `{% highlight %}`: syntax highlights using PrismJS.

### Markdown Highlighter

Optionally specify a language after the start of the markdown fenced code block.

* [List of supported PrismJS languages](http://prismjs.com/#languages-list)

````
<!-- Markdown Template -->
``` js
function myFunction() {
  return true;
}
```
````

````
<!--
  Line highlighting classes (single highlight)
  Adds `highlight-line-active` class to lines 1,3,4,5 (for line highlighting)
-->

<!-- Markdown Template -->
``` js/1,3-5
function myFunction() {
  // …
  return true;
}
```
````

````
<!--
  Line highlighting classes (add and remove mode)
  Adds `highlight-line-add` class to lines 1,3
  Adds `highlight-line-remove` class to lines 5,6,7,8
-->

<!-- Markdown Template -->
``` js/1,3/5-8
function myFunction() {
  // …
  return true;
}
```
````

#### Plain text

Use `text` to use the line highlighting features without PrismJS.

````
``` text/1-2
function myFunction() {
  let highlighted = true;
  return highlighted;
}
```
````

### Liquid Tag: Prism Syntax Highlighter

* [List of supported PrismJS languages](http://prismjs.com/#languages-list)

```
<!-- Liquid Template -->
{% highlight js %}
function myFunction() {
  return true;
}
{% endhighlight %}
```

```
<!--
  Line highlighting classes (single highlight)
  Adds `highlight-line-active` class to lines 1,3,4,5 (for line highlighting)
-->

<!-- Liquid Template -->
{% highlight js 1,3-5 %}
function myFunction() {
  // …
  return true;
}
{% endhighlight %}
```

```
<!--
  Line highlighting classes (add and remove)
  Adds `highlight-line-add` class to lines 1,3
  Adds `highlight-line-remove` class to lines 5,6,7,8
-->

<!-- Liquid Template -->
{% highlight js 1,3 5-8 %}
function myFunction() {
  // …
  return true;
}
{% endhighlight %}
```

#### Plain text

Use `text` to use the line highlighting features without PrismJS.

```
<!-- Liquid Template -->
{% highlight text 1-2 %}
function myFunction() {
  let highlighted = true;
  return highlighted;
}
{% endhighlight %}
```

### Nunjucks Paired Shortcode: Prism Syntax Highlighter

* [List of supported PrismJS languages](http://prismjs.com/#languages-list)

```
<!-- Nunjucks Template -->
{% highlight "js" %}
function myFunction() {
  return true;
}
{% endhighlight %}
```

```
<!--
  Line highlighting classes (single highlight)
  Adds `highlight-line-active` class to lines 1,3,4,5 (for line highlighting)
-->

<!-- Nunjucks Template -->
{% highlight "js 1,3-5" %}
function myFunction() {
  // …
  return true;
}
{% endhighlight %}
```

```
<!--
  Line highlighting classes (add and remove)
  Adds `highlight-line-add` class to lines 1,3
  Adds `highlight-line-remove` class to lines 5,6,7,8
-->

<!-- Nunjucks Template -->
{% highlight "js 1,3 5-8" %}
function myFunction() {
  // …
  return true;
}
{% endhighlight %}
```

#### Plain text

Use `text` to use the line highlighting features without PrismJS.

```
<!-- Nunjucks Template -->
{% highlight "text 1-2" %}
function myFunction() {
  let highlighted = true;
  return highlighted;
}
{% endhighlight %}
```

### Sample Line Highlighting CSS

```css
.highlight-line {
  display: inline-block;

  /* del, ins, mark default styles */
  text-decoration: none;
  color: inherit;
}

/* allow highlighting empty lines */
.highlight-line:empty:before {
  content: " ";
}

.highlight-line:not(:last-child) {
  min-width: 100%;
}
.highlight-line .highlight-line:not(:last-child) {
  min-width: 0;
}


/*
 * Dark theme
 */

.highlight-line-isdir {
  color: #b0b0b0;
  background-color: #222;
}
.highlight-line-active {
  background-color: #444;
  background-color: hsla(0, 0%, 27%, .8);
}
.highlight-line-add {
  background-color: #45844b;
}
.highlight-line-remove {
  background-color: #902f2f;
}
```
