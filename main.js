'use strict';
const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const { download } = require('electron-dl');
const electron = require('electron');
const tray = require('./tray');
const menu = require('./menu');
const config = require('./config');
const watcher = require('./watcher');

// app.disableHardwareAcceleration();
// download.directory = app.getPath('desktop');

let win = null;
let isQuitting = false;

app.on('ready', () => {
	electron.Menu.setApplicationMenu(menu);
	createWindow();
	createShortcuts();
});

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	win.show();
});

app.on('before-quit', () => {
	isQuitting = true;
	config.set('lastWindowState', win.getBounds());
});

const createWindow = () => {
	const lastWindowState = config.get('lastWindowState');

	win = new BrowserWindow({
		title: app.getName(),
		x: lastWindowState.x,
		y: lastWindowState.y,
		width: lastWindowState.width,
		height: lastWindowState.height,
		minWidth: 400,
		minHeight: 200,
		skipTaskBar: true,
		autoHideMenuBar: true,
		darkTheme: true,
		titleBarStyle: 'customButtonsOnHover',
		transparent: true,
		frame: true,
		alwaysOnTop: config.get('alwaysOnTop'),
		webPreferences: {
			nodeIntegration: true,
			experimentalCanvasFeatures: true
		}
	});

	win.loadURL(`file://${__dirname}/index.html`);

	win.on('close', event => {
		if (!isQuitting) {
			event.preventDefault();
			app.hide();
		}
	});

	tray.create(win);
};

const showWindow = () => {
	win.show();
	win.focus();
};

const createShortcuts = () => {
	for (let i = 1; i < 10; i++) {
		globalShortcut.register(`CommandOrControl+${i}`, () => {
			win.webContents.send('showBookmark', i - 1);
		});
	}
};

ipcMain.on('page-title-updated', (events, args) => {
	app.setBadgeCount(args);
	tray.setBadge(args);
});

ipcMain.on('quit', () => {
	app.quit();
});

ipcMain.on('debug', () => {
	win.webContents.openDevTools({ mode: 'detach' });
});
