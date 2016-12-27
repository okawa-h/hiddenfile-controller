'use strict';
const _exec   = require('child_process').exec;
const command = {};

command.hideHiddenFile = function() {

	_exec('defaults write com.apple.finder AppleShowAllFiles false', function(err, stdout, stderr) {
		killAllFinder();
	});

};

command.showHiddenFile = function() {

	_exec('defaults write com.apple.finder AppleShowAllFiles true', function(err, stdout, stderr) {
		killAllFinder();
	});

};

command.isShowHiddenFile = function(callback) {

	_exec('defaults read com.apple.finder AppleShowAllFiles', function(err, stdout, stderr) {
		var boolean;
		stdout = stdout.split('\n')[0];
		if (stdout == 'true') {
			boolean = true;
		} else if (stdout == 'false') {
			boolean = false;
		}
		callback(boolean);
	});

};

function killAllFinder() {

	_exec('killall Finder');

}

module.exports = command;