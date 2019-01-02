'use strict';
const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;
const Bookmark = require('./bookmark');
const config = require('./config');

let main;
let aside;
const bookmarks = [];
let currentBookmark;

document.addEventListener('DOMContentLoaded', () => {
	main = document.querySelector('main');
	aside = document.querySelector('aside');

	for (const bookmarkData of config.get('bookmarks')) {
		createBookmark(bookmarkData);
	}

	showBookmark(0);

	document.documentElement.classList.toggle('dark-mode', config.get('darkMode'));
});

function createBookmark(data) {
	const b = new Bookmark(data);

	main.appendChild(b.view);
	aside.insertBefore(b.handle, aside.lastChild);

	bookmarks.push(b);

	b.hide();

	b.on('click', () => {
		if (b === currentBookmark) {
			return;
		}

		b.show();

		if (currentBookmark !== undefined) {
			currentBookmark.hide();
		}

		currentBookmark = b;
	});

	b.on('page-title-updated', event => {
		let messageCount = 0;
		for (const bookmark of bookmarks) {
			messageCount += Number(bookmark.handle.getAttribute('data-message-count'));
		}
		if (config.get('showUnreadBadge')) {
			ipcRenderer.send('page-title-updated', messageCount);
		}
	});

	return b;
}

var showBookmark = index => {
	bookmarks[index].handleIcon.click();
};

ipcRenderer.on('reload', () => {
	currentBookmark.reload();
});

ipcRenderer.on('reloadAll', () => {
	for (let bookmark of bookmarks) bookmark.reload();
});

ipcRenderer.on('back', () => {
	currentBookmark.back();
});

ipcRenderer.on('forward', () => {
	currentBookmark.forward();
});

ipcRenderer.on('showBookmark', (event, arg) => {
	showBookmark(arg);
});
