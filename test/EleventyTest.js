import test from "ava";
import Eleventy from '@11ty/eleventy';
import syntaxHighlight from "../syntaxHighlight.js";

async function render(inputfile, content) {
  let elev = new Eleventy("./test/stubs-virtual/", "./test/stubs-virtual/_site/", {
    config: function(eleventyConfig) {
      eleventyConfig.addPlugin(syntaxHighlight);
      eleventyConfig.addTemplate(inputfile, content);
    }
  });
  return elev.toJSON();
}

test("Diff output escaped #75", async t => {
  let json = await render("issue-75.njk", `{% highlight "html" %}
<p>Hello</p>
{% endhighlight %}
{% highlight "diff-html" %}
-<p>Hello</p>
{% endhighlight %}`);

  t.is(json.length, 1);
	t.is(json[0].content.trim(), `<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></code></pre>
<pre class="language-diff-html"><code class="language-diff-html"><span class="token deleted-sign deleted language-html"><span class="token prefix deleted">-</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></span></code></pre>`);
});

test("diff-javascript #80", async t => {
  let json = await render("issue-80.md", `\`\`\`diff-javascript
- foo()
\`\`\``);

  t.is(json.length, 1);
	t.is(json[0].content.trim(), `<pre class="language-diff-javascript"><code class="language-diff-javascript"><span class="token deleted-sign deleted language-javascript"><span class="token prefix deleted">-</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span></code></pre>`);
});
