import test from "ava";
import Eleventy from '@11ty/eleventy';
import syntaxHighlight from "../syntaxHighlight.js";

async function renderMarkdown(content, pluginOptions = {}) {
  let elev = new Eleventy("./test/stubs-virtual/", "./test/stubs-virtual/_site/", {
    config: function(eleventyConfig) {
      eleventyConfig.addPlugin(syntaxHighlight, pluginOptions);
      eleventyConfig.addTemplate("test.md", content);
    }
  });
  elev.disableLogger();
  return elev.toJSON();
}

test("Test Markdown Highlighter", async t => {
  let [result] = await renderMarkdown(`\`\`\`js
alert();
\`\`\``, {
  alwaysWrapLineHighlights: true
});

  t.is(result.content.trim(), `<pre class="language-js"><code class="language-js"><span class="highlight-line"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span></code></pre>`);
});

test("Test Markdown Highlighter (lines)", async t => {
  let [result] = await renderMarkdown(`\`\`\`js/0/1
first();
second();
\`\`\``);

  t.is(result.content.trim(), `<pre class="language-js"><code class="language-js"><ins class="highlight-line highlight-line-add"><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></ins>\n<del class="highlight-line highlight-line-remove"><span class="token function">second</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></del></code></pre>`);
});

test("Test Markdown Highlighter No Line Highlights", async t => {
  let [result] = await renderMarkdown(`\`\`\`js
alert();
\`\`\``);

  t.is(result.content.trim(), `<pre class="language-js"><code class="language-js"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>`);
});

test("Markdown with `preAttributes`", async t => {
  let [result] = await renderMarkdown(`\`\`\`js
alert();
\`\`\``, {
  alwaysWrapLineHighlights: true,
  preAttributes: {
    // will override class="language-js"
    class: ({language}) => "not-a-lang-" + language
  }
});

  t.is(result.content.trim(), `<pre class="not-a-lang-js"><code class="language-js"><span class="highlight-line"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span></code></pre>`);
});

test("Test Njk Alias", async t => {
  let [result] = await renderMarkdown(`\`\`\`njk
{% raw %}hello{% endraw %}
\`\`\``);

  t.is(result.content.trim(), `<pre class="language-njk"><code class="language-njk"><span class="token variable">hello</span></code></pre>`);
});

test("Test Nunjucks Alias", async t => {
  let [result] = await renderMarkdown(`\`\`\`nunjucks
{% raw %}hello{% endraw %}
\`\`\``);

  t.is(result.content.trim(), `<pre class="language-nunjucks"><code class="language-nunjucks"><span class="token variable">hello</span></code></pre>`);
});

test("Markdown Invalid language", async t => {
  await t.throwsAsync(async () => {
    await renderMarkdown(`\`\`\`asldkjflksdaj
hello
\`\`\``, {
  errorOnInvalidLanguage: true
});
  });
});

test("Test loader invalid language with ignore", async t => {
  let src = `\`\`\`asldk9
hello
\`\`\``;

  let [result] = await renderMarkdown(src);

  t.is(result.content.trim(), `<pre class="language-asldk9"><code class="language-asldk9">hello</code></pre>`);
});

// test("Test Markdown Highlighter Block Comment", t => {
//   let mdLib = md();
//   mdLib.set({
//     highlight: markdownPrismJsOptions({ alwaysWrapLineHighlights: true })
//   });
//   t.is(mdLib.render(`\`\`\`js
// /*
//  * this is a string
//  */
// \`\`\``).trim(), `<pre class="language-js"><code class="language-js"><span class="token comment"><span class="highlight-line">/*</span><br><span class="highlight-line"> * this is a string</span><br><span class="highlight-line"> */</span></span></code></pre>`);
// });
