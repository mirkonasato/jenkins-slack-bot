'use strict';
let SlackBot = require('slackbots');

class SlackNotifier {

  constructor(config) {
    this.bot = new SlackBot({name: config.botName, token: config.token});
    this.channel = config.channel;
  }

  onBuildFailed(build) {
    this.bot.postMessageToChannel(this.channel, this.format(':disappointed: Failed', build));

  }
  onBuildFailedAgain(build) {
    this.bot.postMessageToChannel(this.channel, this.format(':cry: Failed again', build));
  }

  onBuildFixed(build) {
    this.bot.postMessageToChannel(this.channel, this.format(':smile: Fixed', build));
  }

  format(comment, build) {
    return comment + ': ' + build.name + ' ➔ ' + build.webUrl + build.lastBuildLabel + '/';
  }

}

module.exports = SlackNotifier;
