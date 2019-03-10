'use strict';
const { app, BrowserWindow, BrowserView, globalShortcut, ipcMain } = require('electron');
const { download } = require('electron-dl');
const electron = require('electron');
const tray = require('./tray');
const menu = require('./menu');
const config = require('./config');
const bookmarks = config.get('bookmarks');

download.directory = app.getPath('desktop');

let win = null;
let isQuitting = false;
app.views = [];

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
		titleBarStyle: 'customButtonsOnHover',
		frame: false,
		alwaysOnTop: config.get('alwaysOnTop')
	});

	// win.loadURL(`file://${__dirname}/index.html`);

	for (const bookmarkData of bookmarks) {
		let view = new BrowserView();

		win.setBrowserView(view);
		view.setBounds({ x: 0, y: 0, width: lastWindowState.width, height: lastWindowState.height });
		view.setAutoResize({ width: true, height: true });
		view.webContents.loadURL(bookmarkData.url);
		app.views.push(view);
	}

	win.on('close', event => {
		if (!isQuitting) {
			event.preventDefault();
			app.hide();
		}
	});

	app.win = win;

	tray.create(win);
};

const createShortcuts = () => {
	// for (let i = 1; i < bookmarks.length; i++) {
	// 	globalShortcut.register(`CommandOrControl+${i}`, () => {
	// 		console.log(i, app.views[i].webContents);
	// 		// win.setBrowserView(null);
	// 		app.win.setBrowserView(app.views[i - 1]);
	// 		// win.webContents.send('showBookmark', i - 1);
	// 	});
	// }
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
