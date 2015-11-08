'use strict';

class ConsoleNotifier {

  onBuildFailed(build) {
    this.log('Failed', build);
  }

  onBuildFailedAgain(build) {
    this.log('Failed again', build);
  }

  onBuildFixed(build) {
    this.log('Fixed', build);
  }

  log(comment, build) {
    console.log(comment + ': ' + build.name + ' ➔ ' + build.webUrl + build.lastBuildLabel + '/');
  }

}

module.exports = new ConsoleNotifier();
