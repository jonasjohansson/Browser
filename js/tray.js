'use strict';
const electron = require('electron');

let tray = null;

const trayIconDefault = `${__dirname}/icons/menubarDefaultTemplate.png`;
const trayIconStop = `${__dirname}/icons/menubarStopTemplate.png`;

exports.create = win => {
	const toggleWin = () => {
		if (win.isVisible()) win.hide();
		else win.show();
	};
	tray = new electron.Tray(trayIconDefault);
	tray.on('click', toggleWin);
};

exports.setBadge = shouldDisplayUnread => {
	const icon = shouldDisplayUnread ? trayIconStop : trayIconDefault;
	tray.setImage(icon);
};
