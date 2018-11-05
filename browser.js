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

	// showBookmark(0);
	setDarkMode();
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

var getIndex = () => {
	var arr = currentBookmark.handle.parentNode.children;
	return Array.from(arr).indexOf(currentBookmark.handle);
};

var reload = () => {
	currentBookmark.reload();
};

var back = () => {
	currentBookmark.back();
};

var forward = () => {
	currentBookmark.forward();
};

var setDarkMode = () => {
	document.documentElement.classList.toggle('dark-mode', config.get('darkMode'));
};

var next = () => {
	let index = getIndex();
	index = index < bookmarks.length - 1 ? index + 1 : 0;
	showBookmark(index);
};

var previous = () => {
	let index = getIndex();
	index = index > 0 ? index - 1 : bookmarks.length - 1;
	showBookmark(index);
};

var reset = () => {
	config.clear();
};

var openConfig = () => {
	config.openInEditor();
};

ipcRenderer.on('reload', reload);

ipcRenderer.on('back', back);

ipcRenderer.on('forward', forward);

ipcRenderer.on('showBookmark', (event, arg) => {
	showBookmark(arg);
});

ipcRenderer.on('reset', reset);

ipcRenderer.on('open-config', openConfig);
