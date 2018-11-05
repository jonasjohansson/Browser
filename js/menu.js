'use strict';
const electron = require('electron');
const config = require('./config');

const { app, BrowserWindow, shell } = electron;
const appName = app.getName();

function sendAction(action, arg = null) {
	const win = BrowserWindow.getFocusedWindow();
	win.webContents.send(action, arg);
}

const appMenu = [
	{ role: 'about' },
	{ type: 'separator' },
	// {
	// 	label: 'Show Unread Badge',
	// 	type: 'checkbox',
	// 	checked: config.get('showUnreadBadge'),
	// 	click() {
	// 		config.set('showUnreadBadge', !config.get('showUnreadBadge'));
	// 	}
	// },
	// { type: 'separator' },
	// { role: 'services', submenu: [] },
	{ type: 'separator' },
	{ role: 'hide' },
	{ role: 'hideothers' },
	{ role: 'unhide' },
	{ type: 'separator' },
	{ role: 'quit' }
];

const bookmarkMenu = [
	{
		label: 'Reload',
		accelerator: 'Cmd+R',
		click() {
			sendAction('reload');
		}
	},
	{
		label: 'Back',
		accelerator: 'Cmd+LeftArrow',
		click() {
			sendAction('back');
		}
	},
	{
		label: 'Forward',
		accelerator: 'Cmd+RightArrow',
		click() {
			sendAction('forward');
		}
	}
];

const viewMenu = [
	{
		label: 'Toggle Settings',
		accelerator: 'Cmd+Shift+S',
		click() {
			sendAction('open-config');
		}
	}
];

const windowMenu = [
	{ role: 'minimize' },
	{ role: 'close' }
	// { type: 'separator' }
	// {
	// 	label: 'Select Next Bookmark',
	// 	accelerator: 'Ctrl+Tab',
	// 	click() {
	// 		sendAction('next');
	// 	}
	// },
	// {
	// 	label: 'Select Previous Bookmark',
	// 	accelerator: 'Ctrl+Shift+Tab',
	// 	click() {
	// 		sendAction('previous');
	// 	}
	// },
	// { type: 'separator' },
	// {
	// 	type: 'checkbox',
	// 	label: 'Always on Top',
	// 	accelerator: 'Cmd+Shift+T',
	// 	checked: config.get('alwaysOnTop'),
	// 	click(item, focusedWindow) {
	// 		config.set('alwaysOnTop', item.checked);
	// 		focusedWindow.setAlwaysOnTop(item.checked);
	// 	}
	// }
];

const helpMenu = [
	{
		label: 'Website',
		click() {
			shell.openExternal('https://jonasjohansson.se');
		}
	},
	{
		label: 'Source Code',
		click() {
			shell.openExternal('https://github.com/jonasjohansson/browser');
		}
	},
	{ type: 'separator' },
	{ role: 'toggledevtools' },
	{ type: 'separator' },
	{
		label: 'Reset Bookmarks',
		click() {
			sendAction('reset');
		}
	}
];

const menu = [
	{
		label: appName,
		submenu: appMenu
	},
	{
		role: 'editMenu'
	},
	{
		label: 'Bookmark',
		submenu: bookmarkMenu
	},
	{
		label: 'View',
		submenu: viewMenu
	},
	{
		role: 'window',
		submenu: windowMenu
	},
	{
		role: 'help',
		submenu: helpMenu
	}
];

module.exports = electron.Menu.buildFromTemplate(menu);
