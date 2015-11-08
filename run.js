'use strict';

const MONITOR_URI = 'http://localhost:8080/cc.xml';
const MONITOR_INTERVAL = 5000; //ms
const BOT_NAME = 'Jenkins Bot';
const API_TOKEN = '???';
const SLACK_CHANNEL = 'my-team';

let BuildMonitor = require('./BuildMonitor');
let ConsoleNotifier = require('./ConsoleNotifier');
let SlackNotifier = require('./SlackNotifier');

let slackNotifier = new SlackNotifier({botName: BOT_NAME, token: API_TOKEN, channel: SLACK_CHANNEL});
let monitor = new BuildMonitor({uri: MONITOR_URI, interval: MONITOR_INTERVAL, listeners: [ConsoleNotifier, slackNotifier]});

monitor.start();
