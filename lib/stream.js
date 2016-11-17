var peerflix = require('peerflix')
    spawn    = require('cross-spawn')
    path     = require('path').resolve(__dirname)

module.exports =  {

	startStreaming: function(sub, option, flags, cb){
		var cmdline = [option.magnet, '--mpv'];
		if (sub) cmdline.push('-t', sub);
		if (flags.tmp_dir) cmdline.push('-f', flags.tmp_dir);

		peerflix = spawn(path + '/../node_modules/.bin/peerflix',
			cmdline, { stdio: 'inherit' });

		peerflix.on('close', (code, signal) => {
			process.exit();
		});

	}

}
