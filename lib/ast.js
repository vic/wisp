var count = (require("./sequence")).count;
var first = (require("./sequence")).first;
var isList = (require("./sequence")).isList;;

var subs = (require("./runtime")).subs;
var str = (require("./runtime")).str;
var isObject = (require("./runtime")).isObject;
var isBoolean = (require("./runtime")).isBoolean;
var isString = (require("./runtime")).isString;
var isNumber = (require("./runtime")).isNumber;
var isVector = (require("./runtime")).isVector;
var isNil = (require("./runtime")).isNil;;

var withMeta = function withMeta(value, metadata) {
  Object.defineProperty(value, "metadata", {
    "value": metadata,
    "configurable": true
  });
  return value;
};

var meta = function meta(value) {
  return isObject(value) ?
    value.metadata :
    void(0);
};

var symbol = function symbol(ns, id) {
  return isSymbol(ns) ?
    ns :
  isKeyword(ns) ?
    str("﻿", name(ns)) :
  "else" ?
    isNil(id) ?
      str("﻿", ns) :
      str("﻿", ns, "/", id) :
    void(0);
};

var isSymbol = function isSymbol(x) {
  return (isString(x)) && (count(x) > 1) && (first(x) === "﻿");
};

var isKeyword = function isKeyword(x) {
  return (isString(x)) && (count(x) > 1) && (first(x) === "꞉");
};

var keyword = function keyword(ns, id) {
  return isKeyword(ns) ?
    ns :
  isSymbol(ns) ?
    str("꞉", name(ns)) :
  isNil(id) ?
    str("꞉", ns) :
  isNil(ns) ?
    str("꞉", id) :
  "else" ?
    str("꞉", ns, "/", id) :
    void(0);
};

var name = function name(value) {
  return (isKeyword(value)) || (isSymbol(value)) ?
    (count(value) > 2) && (value.indexOf("/") >= 0) ?
      value.substr((value.indexOf("/")) + 1) :
      subs(value, 1) :
  isString(value) ?
    value :
  "else" ?
    (function() { throw new TypeError(str("Doesn't support name: ", value)); })() :
    void(0);
};

var gensym = function gensym(prefix) {
  return symbol(str(isNil(prefix) ?
    "G__" :
    prefix, gensym.base = gensym.base + 1));
};

gensym.base = 0;

var isUnquote = function isUnquote(form) {
  return (isList(form)) && (first(form) === "﻿unquote");
};

var isUnquoteSplicing = function isUnquoteSplicing(form) {
  return (isList(form)) && (first(form) === "﻿unquote-splicing");
};

var isQuote = function isQuote(form) {
  return (isList(form)) && (first(form) === "﻿quote");
};

var isSyntaxQuote = function isSyntaxQuote(form) {
  return (isList(form)) && (first(form) === "﻿syntax-quote");
};

exports.isSyntaxQuote = isSyntaxQuote;
exports.isQuote = isQuote;
exports.isUnquoteSplicing = isUnquoteSplicing;
exports.isUnquote = isUnquote;
exports.name = name;
exports.gensym = gensym;
exports.keyword = keyword;
exports.isKeyword = isKeyword;
exports.symbol = symbol;
exports.isSymbol = isSymbol;
exports.withMeta = withMeta;
exports.meta = meta;
