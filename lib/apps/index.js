const APP = require('../constants')
const config = require('config-yml').config

const GmailApp = require('./google/gmail')
const DriveApp = require('./google/drive')

module.exports = {
  createApp: (appType) => {
    switch(appType) {
      case APP.GMAIL:
        return new GmailApp(config.app.google.gmail.target_email)
      case APP.DRIVE:
        return new DriveApp()
    }
  }
}