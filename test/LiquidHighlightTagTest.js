const test = require("ava");
const { Liquid } = require('liquidjs');
const LiquidHighlightTag = require("../src/LiquidHighlightTag");

async function renderLiquid(str, data = {}, engine = null) {
	if(!engine) {
		engine = new Liquid();
	}

	let result = await engine.parseAndRender(str, data);
	return result;
}

test("Test Render", async t => {
	t.is("Hi Zach", await renderLiquid("Hi {{name}}", {name: "Zach"}));
});

test("Test Highlight Tag Render", async t => {
  let engine = new Liquid();
  let tag = new LiquidHighlightTag(engine);
  engine.registerTag("highlight", tag.getObject());

  let rendered = await renderLiquid("{% highlight js %}var test;{% endhighlight %}", {}, engine);
	t.is(`<pre class="language-js"><code class="language-js"><span class="token keyword">var</span> test<span class="token punctuation">;</span></code></pre>`, rendered);
});
