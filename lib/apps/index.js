const APP = require('../constants')
const config = require('config-yml').config

const GmailApp = require('./google/gmail')
const DriveApp = require('./google/drive')

const TrelloApp = require('./trello')

module.exports = {
  createApp: (appType) => {
    switch(appType) {
      case APP.GMAIL:
        return new GmailApp(config.app.google.gmail.target_email)
      case APP.DRIVE:
        return new DriveApp()
      case APP.TRELLO:
        return new TrelloApp(config.app.trello.publicKey, config.app.trello.token)
    }
  }
}