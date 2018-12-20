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
				url: 'https://messenger.com/',
				isMuted: false
			},
			{
				url: 'https://gmail.com/',
				isMuted: false
			},
			{
				url: 'https://calendar.google.com/',
				isMuted: false
			},
			{
				url: 'https://drive.google.com/drive/',
				isMuted: false
			},
			{
				url: 'https://docs.google.com/document/',
				isMuted: false
			},
			{
				url: 'https://docs.google.com/spreadsheets/',
				isMuted: false
			},
			{
				url: 'https://contacts.google.com/',
				isMuted: false
			},
			{
				url: 'https://slack.com/',
				isMuted: false
			},
			{
				url: 'https://trello.com/',
				isMuted: false
			},
			{
				url: 'https://www.notion.so/',
				isMuted: false
			}
		]
	}
});
