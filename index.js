const grammar = require('./src/grammar');
const semantics = require('./src/semantics');

module.exports = function parse (str, optRule) {
  const rule = optRule || 'factOrPattern'
  const matchResult = grammar.match(str.trim(), rule)
  if (matchResult.succeeded()) {
    return semantics(matchResult).parse()
  } else {
    throw new Error(`invalid ${rule}: ${str}`)
  }
}
