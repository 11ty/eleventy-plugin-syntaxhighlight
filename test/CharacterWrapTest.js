const test = require("ava");
const CharacterWrap = require("../src/CharacterWrap");

test("CharacterWrap", async t => {
  let wrapper = new CharacterWrap();
  t.is(wrapper.wrapContent("<html></html>", "html"), `<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation"><span class="charwrap" data-index="1">&lt;</span></span><span class="charwrap" data-index="2">h</span><span class="charwrap" data-index="3">t</span><span class="charwrap" data-index="4">m</span><span class="charwrap" data-index="5">l</span></span><span class="token punctuation"><span class="charwrap" data-index="6">&gt;</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation"><span class="charwrap" data-index="7">&lt;</span><span class="charwrap" data-index="8">/</span></span><span class="charwrap" data-index="9">h</span><span class="charwrap" data-index="10">t</span><span class="charwrap" data-index="11">m</span><span class="charwrap" data-index="12">l</span></span><span class="token punctuation"><span class="charwrap" data-index="13">&gt;</span></span></span></code></pre>`);
});

test("CharacterWrap with different class prefix", async t => {
  let wrapper = new CharacterWrap();
  wrapper.setClassPrefix("customprefix");
  t.is(wrapper.wrapContent("<html></html>", "html"), `<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation"><span class="customprefix" data-index="1">&lt;</span></span><span class="customprefix" data-index="2">h</span><span class="customprefix" data-index="3">t</span><span class="customprefix" data-index="4">m</span><span class="customprefix" data-index="5">l</span></span><span class="token punctuation"><span class="customprefix" data-index="6">&gt;</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation"><span class="customprefix" data-index="7">&lt;</span><span class="customprefix" data-index="8">/</span></span><span class="customprefix" data-index="9">h</span><span class="customprefix" data-index="10">t</span><span class="customprefix" data-index="11">m</span><span class="customprefix" data-index="12">l</span></span><span class="token punctuation"><span class="customprefix" data-index="13">&gt;</span></span></span></code></pre>`);
});
