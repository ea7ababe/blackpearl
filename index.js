var async    = require('async');
var stream   = require('./lib/stream.js');
var subs     = require('./lib/subs.js');
var tpb      = require('./lib/tpb.js');
var cli      = require('./lib/cli.js');
var fs       = require('fs');
var chalk    = require('chalk');
var action   = process.argv[2];
var name     = process.argv[3];
var actions  = ["search"];

var subs_language;

var help_screen = function() {

	var path = require('path').resolve(__dirname);

	fs.readFile(path + '/' + 'logo.dat', 'utf8', function (err,data) {
	  	console.log(chalk.yellow(data));
		console.log(chalk.cyan("Usage: blackpearl search [name] [--tmp dir]"));
		console.log(chalk.red("Subtitles: --sub [spa,eng,fre,etc]"));
		process.exit();
	});

}

if (actions.indexOf(action) == -1) {
	console.log(action)
	return help_screen();
}

var sub = process.argv.indexOf("--sub") + 1;
var tmp = process.argv.indexOf("--tmp") + 1;
var flags = {
	subs_lang: sub ? process.argv[sub] : "",
	tmp_dir: tmp ? process.argv[tmp] : "",
}

async.waterfall([
    async.apply(tpb.search, name, flags),
    cli.showResults,
    cli.chooseResult,
    subs.searchSub,
    subs.downloadSub,
    stream.startStreaming
]);
