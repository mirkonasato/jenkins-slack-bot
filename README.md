Jenkins Slack Bot
=================

A simple bot that monitors Jenkins builds and sends notifications to a Slack channel.

Unlike the [Jenkins Slack Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Slack+Plugin) this bot does not require modifying the Jenkins server. You can run the bot on any machine with HTTP access to Jenkins. Also, you can run multiple bots monitoring different URLs and notifying different channels.

Usage
-----

You need Node.js installed. (Tested with v4.2.2.) Download the project dependencies with `npm install`.

Create a new Bot Integration in Slack from `https://[yourteam].slack.com/services/new/bot` and copy the API token.

Edit `run.js` and set the API token, along with the Jenkins URL to monitor, the Slack channel to be notified, etc.

Finally, start with `node run.js`.
