import test from "ava";
import Eleventy from "@11ty/eleventy";
import syntaxHighlight from "../syntaxHighlight.js";

async function renderLiquid(str, data = {}) {
  let elev = new Eleventy("./test/stubs-virtual/", "./test/stubs-virtual/_site/", {
    config: function(eleventyConfig) {
      eleventyConfig.addPlugin(syntaxHighlight);
      eleventyConfig.addTemplate("template.liquid", str, data);
    }
  });
  let [result] = await elev.toJSON();
  return result?.content;
}

test("Test Render", async t => {
	t.is(await renderLiquid("Hi {{name}}", {name: "Zach"}), "Hi Zach");
});

test("Test Highlight Tag Render", async t => {
  let rendered = await renderLiquid("{% highlight 'js' %}var test;{% endhighlight %}");
	t.is(rendered, `<pre class="language-js"><code class="language-js"><span class="token keyword">var</span> test<span class="token punctuation">;</span></code></pre>`);
});

test("Test for raw", async t => {
  // Breaking in v6: content is first interpreted as Liquid (so make sure you use raw if you want that not to happen)
  let rendered = await renderLiquid("{% highlight 'liquid' %}{% raw %}{{ 'hello' }}{% endraw %}{% endhighlight %}");
	t.is(rendered, `<pre class="language-liquid"><code class="language-liquid"><span class="token liquid language-liquid"><span class="token delimiter punctuation">{{</span> <span class="token string">\'hello\'</span> <span class="token delimiter punctuation">}}</span></span></code></pre>`);
});


test("Njk Alias", async t => {
  // Breaking in v6: content is first interpreted as Liquid (so make sure you use raw if you want that not to happen)
  let rendered = await renderLiquid("{% highlight 'njk' %}{% raw %}{{ 'hello' }}{% endraw %}{% endhighlight %}");
	t.is(rendered, `<pre class="language-njk"><code class="language-njk"><span class="token delimiter punctuation">{{</span> <span class="token string">'hello'</span> <span class="token delimiter punctuation">}}</span></code></pre>`);
});

test("Nunjucks alias", async t => {
  // Breaking in v6: content is first interpreted as Liquid (so make sure you use raw if you want that not to happen)
  let rendered = await renderLiquid("{% highlight 'nunjucks' %}{% raw %}{{ 'hello' }}{% endraw %}{% endhighlight %}");
	t.is(rendered, `<pre class="language-nunjucks"><code class="language-nunjucks"><span class="token delimiter punctuation">{{</span> <span class="token string">'hello'</span> <span class="token delimiter punctuation">}}</span></code></pre>`);
});
