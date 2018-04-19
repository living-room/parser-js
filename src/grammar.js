const ohm = require('ohm-js');

const grammar = ohm.grammar(`
  G {

    factOrPattern
      = term*

    term
      = id
      | word
      | value
      | variable
      | wildcard
      | hole

    id
      = "#" alnum*

    value
      = keyword<"true">   -- true
      | keyword<"false">  -- false
      | keyword<"null">   -- null
      | number
      | string

    variable
      = "$" alnum+

    wildcard
      = "$"

    hole
      = "_"

    word
      = (~special any)+  -- nonspace
      | space+           -- space

    keyword<k>
      = k ~alnum

    number
      = float ("e" float)?

    float
      = integer ("." digit+)?

    integer
      = ("+" | "-")? digit+

    string
      = "\\"" (~"\\"" ~"\\n" any)* "\\""

    special
      = id | value | variable | wildcard | hole | space

  }
`)

module.exports = grammar;
