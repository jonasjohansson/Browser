'use strict';
const Store = require('electron-store');

module.exports = new Store({
	defaults: {
		lastWindowState: {
			x: 0,
			y: 0,
			width: 800,
			height: 600
		},
		darkMode: false,
		showUnreadBadge: false,
		alwaysOnTop: false,
		bookmarks: [
			{
				url: 'https://messenger.com/',
				icon: '',
				isMuted: false
			},
			{
				url: 'https://gmail.com/',
				icon: '',
				isMuted: false
			},
			{
				url: 'https://calendar.google.com/',
				icon: '',
				isMuted: false
			},
			{
				url: 'https://drive.google.com/drive/',
				icon: '',
				isMuted: false
			},
			{
				url: 'https://docs.google.com/document/',
				icon: '',
				isMuted: false
			},
			{
				url: 'https://docs.google.com/spreadsheets/',
				icon: '',
				isMuted: false
			},
			{
				url: 'https://contacts.google.com/',
				icon: '',
				isMuted: false
			},
			{
				url: 'https://trello.com/',
				icon: '',
				isMuted: false
			},
			{
				url: 'https://www.notion.so/',
				icon: '',
				isMuted: false
			}
		]
	}
});
