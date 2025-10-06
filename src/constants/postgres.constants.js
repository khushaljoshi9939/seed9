const postgresTypes = {
  numeric: [
    "smallint",
    "integer", "int",
    "bigint",
    "decimal", "numeric",
    "real",
    "double precision",
    "serial", "bigserial", "smallserial"
  ],
  monetary: [
    "money"
  ],
  character: [
    "character varying", "varchar",
    "character", "char",
    "text"
  ],
  binary: [
    "bytea"
  ],
  datetime: [
    "timestamp", "timestamp with time zone", "timestamptz",
    "date",
    "time", "time with time zone", "timetz",
    "interval"
  ],
  boolean: [
    "boolean"
  ],
  enum_user_defined: [
    "enum",
    "composite",
    "domain"
  ],
  geometric: [
    "point", "line", "lseg",
    "box", "path", "polygon", "circle"
  ],
  network: [
    "cidr", "inet", "macaddr", "macaddr8"
  ],
  bit_string: [
    "bit", "bit varying", "varbit"
  ],
  text_search: [
    "tsvector", "tsquery"
  ],
  uuid: [
    "uuid"
  ],
  json: [
    "json", "jsonb"
  ],
  xml: [
    "xml"
  ],
  array: [
    "any[]", 
  ],
  range: [
    "int4range", "int8range", "numrange",
    "tsrange", "tstzrange", "daterange"
  ]
};


const types = {
  // Numeric types
  smallint: {
    javascripttype: "number",
    description: "2-byte integer, range -32,768 to +32,767"
  },
  integer: {
    javascripttype: "number",
    description: "4-byte integer, range -2,147,483,648 to +2,147,483,647",
    aliases: ["int"]
  },
  bigint: {
    javascripttype: "bigint",
    description: "8-byte integer, range up to ±9,223,372,036,854,775,807"
  },
  decimal: {
    javascripttype: "string",
    description: "Arbitrary precision exact numeric",
    aliases: ["numeric"]
  },
  real: {
    javascripttype: "number",
    description: "4-byte floating point number"
  },
  "double precision": {
    javascripttype: "number",
    description: "8-byte floating point number"
  },
  serial: {
    javascripttype: "number",
    description: "Auto-incrementing 4-byte integer"
  },
  bigserial: {
    javascripttype: "bigint",
    description: "Auto-incrementing 8-byte integer"
  },
  smallserial: {
    javascripttype: "number",
    description: "Auto-incrementing 2-byte integer"
  },

  // Monetary
  money: {
    javascripttype: "string",
    description: "Currency amount with fixed fractional precision"
  },

  // Character types
  "character varying": {
    javascripttype: "string",
    description: "Variable-length string",
    aliases: ["varchar"]
  },
  character: {
    javascripttype: "string",
    description: "Fixed-length string",
    aliases: ["char"]
  },
  text: {
    javascripttype: "string",
    description: "Variable unlimited length string"
  },

  // Binary
  bytea: {
    javascripttype: "Buffer",
    description: "Binary data (byte array)"
  },

  // Date/time
  timestamp: {
    javascripttype: "Date",
    description: "Date and time (no time zone)"
  },
  "timestamp with time zone": {
    javascripttype: "Date",
    description: "Date and time with time zone",
    aliases: ["timestamptz"]
  },
  date: {
    javascripttype: "Date",
    description: "Calendar date (year, month, day)"
  },
  time: {
    javascripttype: "string",
    description: "Time of day (no time zone)"
  },
  "time with time zone": {
    javascripttype: "string",
    description: "Time of day with time zone",
    aliases: ["timetz"]
  },
  interval: {
    javascripttype: "string",
    description: "Time span (e.g. 1 day 2 hours)"
  },

  // Boolean
  boolean: {
    javascripttype: "boolean",
    description: "Logical Boolean (true/false)"
  },

  // User-defined
  enum: {
    javascripttype: "string",
    description: "Enumerated type"
  },
  composite: {
    javascripttype: "object",
    description: "Composite type (row-like structure)"
  },
  domain: {
    javascripttype: "depends",
    description: "User-defined domain type"
  },

  // Geometric
  point: { javascripttype: "object", description: "Geometric point (x, y)" },
  line: { javascripttype: "object", description: "Infinite line" },
  lseg: { javascripttype: "object", description: "Line segment" },
  box: { javascripttype: "object", description: "Rectangular box" },
  path: { javascripttype: "object", description: "Path (open or closed)" },
  polygon: { javascripttype: "object", description: "Polygon" },
  circle: { javascripttype: "object", description: "Circle" },

  // Network
  cidr: { javascripttype: "string", description: "IPv4 or IPv6 network" },
  inet: { javascripttype: "string", description: "IPv4 or IPv6 host/address" },
  macaddr: { javascripttype: "string", description: "MAC address" },
  macaddr8: { javascripttype: "string", description: "MAC address (EUI-64)" },

  // Bit string
  bit: { javascripttype: "string", description: "Fixed-length bit string" },
  "bit varying": {
    javascripttype: "string",
    description: "Variable-length bit string",
    aliases: ["varbit"]
  },

  // Text search
  tsvector: { javascripttype: "string", description: "Text search vector" },
  tsquery: { javascripttype: "string", description: "Text search query" },

  // UUID
  uuid: { javascripttype: "string", description: "UUID (128-bit value)" },

  // JSON
  json: { javascripttype: "object", description: "JSON data" },
  jsonb: { javascripttype: "object", description: "Binary JSON storage" },

  // XML
  xml: { javascripttype: "string", description: "XML data" },

  // Arrays
  "any[]": { javascripttype: "array", description: "Array of any element type" },

  // Ranges
  int4range: { javascripttype: "object", description: "Range of integer" },
  int8range: { javascripttype: "object", description: "Range of bigint" },
  numrange: { javascripttype: "object", description: "Range of numeric" },
  tsrange: { javascripttype: "object", description: "Range of timestamp" },
  tstzrange: { javascripttype: "object", description: "Range of timestamptz" },
  daterange: { javascripttype: "object", description: "Range of date" }
};
