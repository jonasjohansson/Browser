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
		showUnreadBadge: true,
		alwaysOnTop: false,
		bookmarks: [
			{
				url: 'https://messenger.com/'
				// isMuted: false,
				// icon: ''
			},
			{
				url: 'https://calendar.google.com/'
				// isMuted: false,
				// icon: ''
			},
			{
				url: 'https://drive.google.com/drive/'
				// isMuted: false,
				// icon: ''
			},
			{
				url: 'https://docs.google.com/'
				// isMuted: false,
				// icon: ''
			},
			{
				url: 'https://spreadsheets.google.com/'
				// isMuted: false,
				// icon: ''
			},
			{
				url: 'https://contacts.google.com/'
				// isMuted: false,
				// icon: ''
			},
			{
				url: 'https://trello.com/'
				// isMuted: false,
				// icon: ''
			}
		]
	}
});
