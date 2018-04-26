const ohm = require('ohm-js');

const grammar = ohm.grammar(`
  LivingRoom {

    factOrPattern (zero or more terms)
      = term*

    term (a valid term for the grammar)
      = value
      | hole
      | id
      | variable
      | wildcard
      | word
      | whitespace

    value (anything that will parse into a literal value)
      = "true"   -- true
      | "false"  -- false
      | "null"   -- null
      | number
      | integer
      | string

    id (a unique identifier)
      = hash alnum*

    variable (a named variable placeholder)
      = dollar alnum+

    wildcard (an unnamed variable placeholder)
      = dollar

    hole
      = underscore

    whitespace (one or more spaces)
      = space+

    word
      = word_pattern+ ~digit
      | word_char+

    number
      = float ("e" float)?

    float
      = integer (period digit+)?
      | period digit (digit+)?

    integer
      = ("+" | "-")? digit+

    string (a quoted string)
      = double_quote (~double_quote ~"\\n" any)* double_quote

    word_char (anything that can be part of a word)
      = ~(hash| double_quote | dollar | underscore | space | digit | period) any

    word_pattern (can be a word_char followed by any numbers)
      = word_char+ "."+

    double_quote = "\\""
    hash = "#"
    dollar = "$"
    underscore = "_"
    period = "."

  }
`)

module.exports = grammar;
