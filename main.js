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
	globalShortcut.register('CommandOrControl+0', () => {
		win.webContents.send('showBookmark', 9);
	});

	globalShortcut.register('CommandOrControl+1', () => {
		win.webContents.send('showBookmark', 0);
	});

	globalShortcut.register('CommandOrControl+2', () => {
		win.webContents.send('showBookmark', 1);
	});

	globalShortcut.register('CommandOrControl+3', () => {
		win.webContents.send('showBookmark', 2);
	});

	globalShortcut.register('CommandOrControl+4', () => {
		win.webContents.send('showBookmark', 3);
	});

	globalShortcut.register('CommandOrControl+5', () => {
		win.webContents.send('showBookmark', 4);
	});

	globalShortcut.register('CommandOrControl+6', () => {
		win.webContents.send('showBookmark', 5);
	});

	globalShortcut.register('CommandOrControl+7', () => {
		win.webContents.send('showBookmark', 6);
	});

	globalShortcut.register('CommandOrControl+8', () => {
		win.webContents.send('showBookmark', 7);
	});

	globalShortcut.register('CommandOrControl+9', () => {
		win.webContents.send('showBookmark', 8);
	});
};

ipcMain.on('page-title-updated', (events, args) => {
	console.log(args);
	app.setBadgeCount(args);
	tray.setBadge(args);
});

ipcMain.on('quit', () => {
	app.quit();
});

ipcMain.on('debug', () => {
	win.webContents.openDevTools({ mode: 'detach' });
});
