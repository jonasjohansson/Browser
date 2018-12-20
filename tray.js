'use strict';
const electron = require('electron');

let tray = null;

const trayIconDefault = `${__dirname}/assets/icons/trayIcon.png`;
const trayIconUnread = `${__dirname}/assets/icons/trayIconUnread.png`;

exports.create = win => {
	tray = new electron.Tray(trayIconDefault);
	tray.setHighlightMode('never');
	tray.on('click', () => {
		win.show();
		win.focus();
	});
};

exports.setBadge = shouldDisplayUnread => {
	const icon = shouldDisplayUnread ? trayIconUnread : trayIconDefault;
	tray.setImage(icon);
};
