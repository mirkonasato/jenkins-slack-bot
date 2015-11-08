'use strict';
let request = require('request');
let xml2js = require('xml2js');

class BuildMonitor {

  constructor(config) {
    this.uri = config.uri;
    this.interval = config.interval;
    this.listeners = config.listeners;
    this.previousBuilds = {};
  }

  start() {
    this.update();
  }

  update() {
    request(this.uri, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        xml2js.parseString(body, (error, data) => {
          let builds = data['Projects']['Project'].map(project => project.$);
          builds.forEach(build => {
            let previousBuild = this.previousBuilds[build.name];
            if (!previousBuild || build.lastBuildLabel !== previousBuild.lastBuildLabel) {
              this.handleTransition(previousBuild, build);
            }
            this.previousBuilds[build.name] = build;
          });
        });
      } else {
        console.log('WARNING! Update failed: ' + error);
      }
      setTimeout(this.update.bind(this), this.interval);
    });
  }

  handleTransition(previousBuild, build) {
    let transition = (previousBuild ? previousBuild.lastBuildStatus : 'Unknown') + ' > ' + build.lastBuildStatus;
    switch (transition) {
      case 'Success > Failure':
        this.listeners.forEach(listener => listener.onBuildFailed(build));
        break;
      case 'Failure > Failure':
        this.listeners.forEach(listener => listener.onBuildFailedAgain(build));
        break;
      case 'Failure > Success':
        this.listeners.forEach(listener => listener.onBuildFixed(build));
        break;
    }
  }

}

module.exports = BuildMonitor;
