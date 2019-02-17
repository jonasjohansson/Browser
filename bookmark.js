const { shell, dialog } = require('electron').remote;
const { URL } = require('url');
const faviconUrl = require('favicon-url');
const lookup = require('./lookup');
const EventEmitter = require('event-emitter-es6');

const iconPath = './assets/icons/';

class Bookmark extends EventEmitter {
	constructor(data) {
		super();

		this.handle = document.createElement('div');
		this.handle.classList.add('bookmark');

		this.view = new WebView();
		this.view.autosize = true;
		this.view.allowpopups = true;

		this.handleIcon = document.createElement('div');
		this.handleIcon.classList.add('icon');

		this.view.src = this.addHTTP(data.url);

		this.getIcon(this.view.src);

		this.handle.appendChild(this.handleIcon);

		/* Listeners */

		this.view.addEventListener('dom-ready', () => {
			this.view.setAudioMuted(this.handle.classList.contains('is-muted'));
		});

		this.view.addEventListener('new-window', event => {
			event.preventDefault();
			const url = new URL(event.url);
			const href = url.href;
			const protocol = url.protocol;
			if (protocol === 'http:' || protocol === 'https:') {
				console.log(href);
				if (href.includes('accounts.google.com') || href.includes('https://mail.google.com/mail/') || href.includes('?authuser')) this.view.src = href;
				else shell.openExternal(href);
			}
		});

		this.view.addEventListener('page-title-updated', event => {
			event.preventDefault();
			const title = event.title;

			if (this.view.src.includes('messenger') && !title.includes('Messenger')) {
				return;
			}

			let messageCount = /\(([0-9]+)\)/.exec(title);
			messageCount = messageCount ? Number(messageCount[1]) : 0;

			this.handle.classList.toggle('unread', messageCount);
			this.handle.setAttribute('data-message-count', messageCount);
			this.emit('page-title-updated', this);
		});

		this.handle.addEventListener('click', () => {
			this.emit('click', this);
		});
	}

	show() {
		this.handle.classList.add('active');
		this.view.classList.remove('hidden');
	}

	hide() {
		this.handle.classList.remove('active');
		this.view.classList.add('hidden');
	}

	reload() {
		this.view.reload();
	}

	back() {
		this.view.goBack();
	}

	forward() {
		this.view.goForward();
	}

	getIcon(url) {
		for (let entry of lookup) {
			if (url.includes(entry[0])) {
				this.setIcon(iconPath + entry[1]);
				return;
			}
		}
		const host = new URL(url).host;
		faviconUrl(host, { timeout: 2000, minBufferLength: 400 }, favicon => {
			if (favicon !== null) {
				this.setIcon(favicon);
			}
		});
	}

	setIcon(icon) {
		if (icon.length > 8) {
			this.handleIcon.style.backgroundImage = `url(${icon})`;
			this.handleIcon.innerHTML = '';
		} else {
			this.handleIcon.innerHTML = icon;
			this.handleIcon.style.backgroundImage = '';
		}
		this.handleIcon.setAttribute('data-icon', icon);
	}

	addHTTP(url) {
		if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
			url = `http://${url}`;
		}
		return url;
	}
}

module.exports = Bookmark;
