'use strict';

const builder = require('electron-builder');
const Platform = builder.Platform;

// Promise is returned
builder
    .build({
        targets: Platform.MAC.createTarget(),
        config: {
            appId: 'se.jonasjohansson.browser',

            mac: {
                category: 'public.app-category.social-networking',
                target: ['dir'],
                electronUpdaterCompatibility: '>=2.16.0'
            }
        }
    })
    .then(() => {
        // handle result
    })
    .catch(error => {
        // handle error
    });

// build options, see https://goo.gl/QQXmcV
// https://www.electron.build/configuration/mac
