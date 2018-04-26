const grammar = require('./src/grammar');
const semantics = require('./src/semantics');

module.exports = function parse (str, optRule) {
  const rule = optRule || 'factOrPattern'
  const matchResult = grammar.match(str.trim(), rule)
  if (matchResult.succeeded()) {
    return semantics(matchResult).parse()
  } else {
    // TODO use `matchResult.message` or `matchResult.shortMessage`
    // once https://github.com/harc/ohm/pull/218 is resolved
    throw new Error(`Parsing '${str}' failed.`);
  }
}
