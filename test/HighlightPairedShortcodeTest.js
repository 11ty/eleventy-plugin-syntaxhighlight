import test from "ava";
import HighlightPairedShortcode from "../src/HighlightPairedShortcode";

test("Base", async t => {
  t.is(await HighlightPairedShortcode(`alert();
alert();`, "js"), `<pre class="language-js"><code class="language-js"><span class="highlight-line"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span><br><span class="highlight-line"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span></code></pre>`);
});

test("Highlight Active", async t => {
  t.is(await HighlightPairedShortcode(`alert();
alert();`, "js", "0"), `<pre class="language-js"><code class="language-js"><mark class="highlight-line highlight-line-active"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></mark><br><span class="highlight-line"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span></code></pre>`);

  t.is(await HighlightPairedShortcode(`alert();
alert();`, "js", "0-1"), `<pre class="language-js"><code class="language-js"><mark class="highlight-line highlight-line-active"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></mark><br><mark class="highlight-line highlight-line-active"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></mark></code></pre>`);
});

test("Highlight Add/Remove", async t => {
  t.is(await HighlightPairedShortcode(`alert();
alert();`, "js", "0 1"), `<pre class="language-js"><code class="language-js"><ins class="highlight-line highlight-line-add"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></ins><br><del class="highlight-line highlight-line-remove"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></del></code></pre>`);

  t.is(await HighlightPairedShortcode(`alert();
alert();`, "js", "1 0"), `<pre class="language-js"><code class="language-js"><del class="highlight-line highlight-line-remove"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></del><br><ins class="highlight-line highlight-line-add"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></ins></code></pre>`);
});
