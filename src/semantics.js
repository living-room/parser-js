const grammar = require('./grammar');

const semantics = grammar.createSemantics().addOperation('parse', {
  factOrPattern (terms) {
    return terms.parse()
  },
  id (_, cs) {
    return { id: cs.sourceString }
  },
  value_true (_) {
    return { value: true }
  },
  value_false (_) {
    return { value: false }
  },
  value_null (_) {
    return { value: null }
  },
  variable (_, cs) {
    return { variable: cs.sourceString }
  },
  wildcard (_) {
    return { wildcard: true }
  },
  hole (_) {
    return { hole: true }
  },
  word(_) {
    return { word: this.sourceString }
  },
  ws(_) {
    return { word: ' ' }
  },
  integer (_1, _2) {
    return { value: parseInt(this.sourceString) }
  },
  float (_1, _2, _3) {
    return { value: parseFloat(this.sourceString) }
  },
  number (_1, _2, _3) {
    return { value: parseFloat(this.sourceString) }
  },
  string (_oq, cs, _cq) {
    const chars = []
    let idx = 0
    cs = cs.parse()
    while (idx < cs.length) {
      let c = cs[idx++]
      if (c === '\\' && idx < cs.length) {
        c = cs[idx++]
        switch (c) {
          case 'n':
            c = '\n'
            break
          case 't':
            c = '\t'
            break
          default:
            idx--
        }
      }
      chars.push(c)
    }
    return { value: chars.join('') }
  },
  _terminal () {
    return this.sourceString
  }
});

module.exports = semantics;
