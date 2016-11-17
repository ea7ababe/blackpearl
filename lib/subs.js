var Download = require('download');
var OS       = require("opensubtitles-api");
var os       = require('os');
var chalk    = require('chalk');
var opensub  = new OS('Popcorn Time v1');  // Thanks Popcorn!

module.exports = {

	searchSub: function(option, flags, cb){
		var lang = flags.subs_lang;

		if(lang) {

			opensub.search({ query: option.name, sublanguageid: lang }).then(function(sub){

				if(!sub[Object.keys(sub)]){
					console.log( chalk.red("✖ Subtitles not found: You can add them manually.") );
					return cb(null, null, option, flags);
				} else {
			    		console.log( chalk.green("✔ Subtitles found") );
					return cb(null, sub[Object.keys(sub)].url, option, flags);
				}

			});

		} else {
        		return cb(null, null, option, flags);
        	}

	},

	downloadSub: function(subs, option, flags, cb){

		if(subs){

			var sub_file = os.tmpdir() + "/" + subs.substring( subs.lastIndexOf('/') + 1 )

		 	new Download({mode: '755'})
			    .get(subs)
			    .dest(os.tmpdir())
			    .run(function(err, files){
			    	console.log( chalk.green("✔ Subtitles downloaded") )
			        return cb(null, sub_file, option, flags);
                	    });

		} else {
            		return cb(null, null, option, flags);
        	}

	}

}
