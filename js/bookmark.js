const { shell, dialog } = require('electron').remote;
const { URL } = require('url');
const faviconUrl = require('favicon-url');
const EventEmitter = require('event-emitter-es6');
const lookup = require('./lookup');

class Bookmark extends EventEmitter {
    constructor(data) {
        super();

        this.handle = document.createElement('div');
        this.handle.classList.add('bookmark');

        this.view = new WebView();
        this.view.autosize = true;
        this.view.allowpopups = true;
        // this.view.plugins = true;

        this.handleIcon = document.createElement('div');
        this.handleIcon.classList.add('icon');
        this.handleIcon.draggable = true;

        if (data.url !== '') {
            this.view.src = this.addHTTP(data.url);
        }

        if (data.icon === '' || data.icon === null) {
            if (data.url !== '') {
                this.getIcon(this.view.src);
            }
        } else {
            this.setIcon(data.icon);
        }

        this.handle.classList.toggle('is-muted', data.isMuted);

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
                if (href.includes('accounts.google.com') || href.includes('drive?authuser')) {
                    this.view.src = href;
                } else {
                    shell.openExternal(href);
                }
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
        for (const entry in lookup) {
            if (url.includes(entry)) {
                this.setIcon(lookup[entry]);
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
