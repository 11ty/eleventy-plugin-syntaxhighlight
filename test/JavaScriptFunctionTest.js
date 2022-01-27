const test = require("ava");
const Eleventy = require('@11ty/eleventy');

test("Test Highlight JavaScript Function Render", async t => {
  let elev = new Eleventy("./test/11tyjs-test/", "./test/11tyjs-test/_site/", {
    configPath: "./test/11tyjs-test/.eleventy.js"
  });
  let json = await elev.toJSON();

  t.is(json.length, 1);
  let rendered = json[0].content;
	t.is(`<pre class="language-js"><code class="language-js"><span class="token keyword">var</span> test<span class="token punctuation">;</span></code></pre>`, rendered);
});
