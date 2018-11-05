'use strict';
const { app, dialog } = require('electron');
const fs = require('fs');
const md5 = require('md5');

const configPath = `${app.getPath('userData')}/config.json`;

let count = 0;
let md5Previous = null;
let fsWait = false;

fs.watchFile(configPath, (event, filename) => {
	if (filename) {
		if (fsWait) return;
		fsWait = setTimeout(() => {
			fsWait = false;
		}, 100);
		const md5Current = md5(fs.readFileSync(configPath));
		if (md5Current === md5Previous) {
			return;
		}
		md5Previous = md5Current;
		// console.log(`${filename} file Changed`);
		// if (count < 1) {
		// 	console.log(count);
		// 	count++;
		// 	return true;
		// }
		let result = dialog.showMessageBox({
			type: 'question',
			title: 'Title',
			message: 'Message',
			detail: 'Detail',
			buttons: ['OK', 'cancel']
		});
		if (result == 0) {
			app.relaunch();
			app.exit();
		}
	}
});
