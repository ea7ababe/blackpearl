var async    = require('async');
var readline = require('readline');
var chalk    = require('chalk');

rl = readline.createInterface({
    input: process.stdin,
    output: process.stout
});


module.exports = {

    showResults: function(results, flags, cb){

	if(results.length <= 0){
		console.log("No results");
		process.exit();
	}

	var i = 0;

	async.each(results, function(option, asyncCB){
		console.log(
			chalk.yellow(i + ") ")      +  option.name  +
			chalk.green(" Seeders:  "   +  option.seeds)+
			chalk.red(" Leechers: "     +  option.leechs)
		);
		i++;
		asyncCB();
	}, function(fn){
		return cb(null, results, flags);
	});

    },

    chooseResult: function(results, flags, cb){

	process.stdout.write("It's time to choose: ");

	rl.question("", (option) => {

		var optInt = parseInt(option);

		if ( !results[optInt] ){
			console.log(chalk.red("Bad option."));
			process.exit();
		}

		rl.close();

		return cb(null, results[optInt], flags);

	});

    }

}
