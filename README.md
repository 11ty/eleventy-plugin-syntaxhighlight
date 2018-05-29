# eleventy-plugin-syntaxhighlight

A pack of [Eleventy](https://github.com/11ty/eleventy) plugins for syntax highlighting using the Liquid templating engine. No runtime JavaScript here, these highlight transformations are all done at build-time.

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

[Read more about Eleventy plugins.](https://github.com/11ty/eleventy/blob/master/docs/plugins.md)

## Usage

### Supplies:

* Markdown Highlighter: syntax highlights using PrismJS
* Liquid Tag `{% highlight %}`: syntax highlights using PrismJS.
* Liquid Tag `{% highlight-plain %}`: (Deprecated)

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

### Liquid Tag: Plain Code Block (Deprecated)

⚠️ This tag is now deprecated—use `{% highlight text %}` instead.

```
{% highlight-plain js 1,3 5-8 %}
```
