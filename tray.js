'use strict';
const electron = require('electron');

let tray = null;

const trayIconDefault = `${__dirname}/icons/trayIcon.png`;
const trayIconUnread = `${__dirname}/icons/trayIconUnread.png`;

exports.create = win => {
	const toggleWin = () => {
		if (win.isVisible()) win.hide();
		else win.show();
	};
	tray = new electron.Tray(trayIconDefault);
	tray.on('click', toggleWin);
};

exports.setBadge = shouldDisplayUnread => {
	console.log(shouldDisplayUnread);
	const icon = shouldDisplayUnread ? trayIconUnread : trayIconDefault;
	tray.setImage(icon);
};
