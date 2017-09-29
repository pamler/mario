const APP = require('../constants')
const config = require('config-yml').config
const GmailApp = require('./google/gmail')

module.exports = {
  createApp: (appType) => {
    switch(appType) {
      case APP.GMAIL:
        return new GmailApp(config.app.google.gmail.target_email)
    }
  }
}