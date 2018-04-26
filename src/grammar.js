const ohm = require('ohm-js');

const grammar = ohm.grammar(`
  G {

    factOrPattern
      = term*

    term
      = value
      | hole
      | id
      | variable
      | wildcard
      | word
      | ws

    value
      = "true"   -- true
      | "false"  -- false
      | "null"   -- null
      | number
      | integer
      | string

    id
      = "#" alnum*

    variable
      = "$" alnum+

    wildcard
      = "$"

    hole
      = "_"

    ws
      = space+

    word
      = word_pattern+ ~digit
      | word_char+

    number
      = float ("e" float)?

    float
      = integer ("." digit+)?
      | "." digit (digit+)?

    integer
      = ("+" | "-")? digit+

    string
      = "\\"" (~"\\"" ~"\\n" any)* "\\""

    word_char = ~("#" | "\\"" | "$" | "_" | space | digit | ".") any
    word_pattern = word_char+ "."+
  }
`)

module.exports = grammar;
