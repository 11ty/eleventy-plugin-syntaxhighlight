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

## Usage

### This plugin provides:

* Markdown Highlighter: syntax highlights using PrismJS
* Liquid Tag `{% highlight %}`: syntax highlights using PrismJS.

### Markdown Highlighter

Optionally specify a language after the start of the markdown fenced code block.

* [List of supported PrismJS languages](http://prismjs.com/#languages-list)

````
``` js
function myFunction() {
  return true;
}
```
````

````
// Line highlighting classes (single highlight)
// Adds `highlight-line-active` class to lines 1,3,4,5 (for line highlighting)
``` js/1,3-5
function myFunction() {
  // …
  return true;
}
```
````

````
// Line highlighting classes (add and remove mode)
// Adds `highlight-line-add` class to lines 1,3
// Adds `highlight-line-remove` class to lines 5,6,7,8
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
{% highlight js %}
function myFunction() {
  return true;
}
{% endhighlight %}
```

```
// Line highlighting classes (single highlight)
// Adds `highlight-line-active` class to lines 1,3,4,5 (for line highlighting)
{% highlight js 1,3-5 %}
function myFunction() {
  // …
  return true;
}
{% endhighlight %}
```

```
// Line highlighting classes (add and remove)
// Adds `highlight-line-add` class to lines 1,3
// Adds `highlight-line-remove` class to lines 5,6,7,8
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
{% highlight text 1-2 %}
function myFunction() {
  let highlighted = true;
  return highlighted;
}
{% endhighlight %}
```

### Sample Line Highlighting CSS

```
.highlight-line {
  display: block;
  padding: 0.125em 1em;
  text-decoration: none; /* override del, ins, mark defaults */
  color: inherit; /* override del, ins, mark defaults */
}
.highlight-line:not(:empty) + br {
  display: none;
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
