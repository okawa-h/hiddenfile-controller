'use strict';
const _electron      = require('electron');
const _app           = _electron.app;
const _BrowserWindow = _electron.BrowserWindow;
const _Menu          = _electron.Menu;
const _Tray          = _electron.Tray;
const _dialog        = _electron.dialog;
const _exec          = require('child_process').exec;
const _command       = require(__dirname + '/src/utils/command.js');

let _mainWindow;
let _tray;

_app.on('window-all-closed', function() {
	if (process.platform != 'darwin') {
		_app.quit();
	}
});

_app.on('ready', function() {

	_app.dock.hide();
	_command.isShowHiddenFile(setTray);

});

function setTray(isShow) {

	_tray = new _Tray(getIconName(!isShow).toString());
	_tray.setToolTip('不可視ファイルどうする');
	_tray.on('click', function(e, bounds) {
		_command.isShowHiddenFile(check);
	});
	_tray.on('right-click', function(e, bounds) {
		_app.quit();
	});

}

function check(isShow) {

	changeIcon(isShow);
	if (isShow) {
		_command.hideHiddenFile();
	} else {
		_command.showHiddenFile();
	}

}

function changeIcon(isShow) {

	_tray.setImage(getIconName(isShow).toString());

}

function getIconName(isShow) {

	var icon = __dirname + '/files/img/icon_';
	icon += (!isShow) ? 'show.png' : 'hidden.png';
	return icon;

}

function alert(msg) {

	var options = {
		detail: msg
	};
	var win = _BrowserWindow.getFocusedWindow();
	_dialog.showMessageBox(win, options);

}