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
				url: 'https://keep.google.com/'
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
				url: 'https://translate.google.com/'
				// isMuted: false,
				// icon: ''
			},

		]
	}
});
