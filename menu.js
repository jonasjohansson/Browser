'use strict';
const electron = require('electron');
const path = require('path');
const config = require('./config');
const lookup = require('./lookup');
const bookmarks = config.get('bookmarks');

const { ipcRenderer } = require('electron');

const { app, BrowserWindow, BrowserView, shell } = electron;
const appName = app.getName();

console.log(app.win);
function sendAction(action, arg = null) {
	win.webContents.send(action, arg);
}

const appMenu = [
	// { role: 'about' },
	// { type: 'separator' },
	{
		label: 'Preferences…',
		accelerator: 'Cmd+,',
		click() {
			config.openInEditor();
		}
	},
	{
		label: 'Icons…',
		click() {
			lookup.openInEditor();
		}
	},
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
		label: 'Reload All',
		accelerator: 'Cmd+Shift+R',
		click() {
			sendAction('reloadAll');
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
	},
	{ type: 'separator' }
];

let i = 0;
for (const bookmarkData of bookmarks) {
	bookmarkMenu.push({
		label: bookmarkData.url,
		accelerator: `CommandOrControl+${i}`,
		click(i) {
			console.log(app.win);
			app.win.setBrowserView(app.views[i - 1]);
		}
	});
	i++;
}

const windowMenu = [{ role: 'minimize' }, { role: 'close' }];

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
	{
		label: 'Reset',
		click() {
			config.clear();
			lookup.clear();
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
		role: 'window',
		submenu: windowMenu
	},
	{
		role: 'help',
		submenu: helpMenu
	}
];

module.exports = electron.Menu.buildFromTemplate(menu);
