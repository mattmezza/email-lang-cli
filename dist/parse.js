'use strict';

var _args = require('args');

var _args2 = _interopRequireDefault(_args);

var _emailLang = require('email-lang');

var _emailLang2 = _interopRequireDefault(_emailLang);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_args2.default.option('file', 'The file containing the email text you want to parse').option('dir', 'The directory containing the email text files you want to parse').option('out-file', 'The output file in which you want the emails to be parsed', 'emails.json');

var flags = _args2.default.parse(process.argv);
if (flags.file) {
  console.log('Parsing file ' + flags.file);
  try {
    var emails = (0, _emailLang2.default)(_fs2.default.readFileSync(flags.file, 'utf8'));
    _fs2.default.writeFileSync(flags.outFile, JSON.stringify(emails, null, 2), 'utf8');
  } catch (err) {
    console.error(err);
    process.exit(2);
  }
} else if (flags.dir) {
  console.log('Parsing files from directory ' + flags.dir);
  var allFiles = _fs2.default.readdirSync(flags.dir);
  var files = allFiles.filter(function (f) {
    return f.match('.txt$');
  });
  var _emails = [];
  files.map(function (f) {
    try {
      var e = (0, _emailLang2.default)(_fs2.default.readFileSync(_path2.default.join(flags.dir, f), 'utf8'));
      _emails = _emails.concat(e);
    } catch (err) {
      console.error(err);
      process.exit(2);
    }
  });
  if (_emails.length > 0) {
    _fs2.default.writeFileSync(flags.outFile, JSON.stringify(_emails, null, 2), 'utf8');
  }
} else {
  console.error('At least one between \'file\' or \'dir\' needs to be specified');
  process.exit(1);
}

console.log('Parsed emails have been saved in ' + flags.outFile);
process.exit(0);