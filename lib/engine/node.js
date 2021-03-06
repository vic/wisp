var fs = require("fs");

var rest = (require("../sequence")).rest;;

var str = (require("../runtime")).str;;

var readFromString = (require("../reader")).readFromString;;

var compileProgram = (require("../compiler")).compileProgram;;

var transpile = function transpile(source, uri) {
  return str(compileProgram(rest(readFromString(str("(do ", source, ")"), uri))), "\n");
};

require.extensions[".wisp"] = function(module, uri) {
  return module._compile(transpile(fs.readFileSync(uri, "utf8")), uri);
};

module.exports = transpile
