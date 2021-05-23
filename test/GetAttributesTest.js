const test = require("ava");
const ga = require("../src/getAttributes");

test("Falsy", t => {
  t.is(ga(false), "");
  t.is(ga(null), "");
  t.is(ga(undefined), "");
  t.is(ga(""), "");
  t.throws(() => {
    ga(" test='1'");
  });
});

test("Object syntax", t => {
  t.is(ga({}), "");
  t.is(ga({ hi: 1 }), ' hi="1"');
  t.is(ga({ hi: 1, bye: 2 }), ' hi="1" bye="2"');
});
