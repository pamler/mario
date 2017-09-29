const AppFactory = require('./apps')
const App = require('./constants')

const googleAuth = require('./apps/google/auth')

class Mario {
  constructor() {
    this.chainable = []
    this.auths = {}
  }

  pipe(appType, rules) {
    this.chainable.push({
      type: appType,
      fn: (recvData) => {
        const app = AppFactory.createApp(appType)
        return rules(app, recvData)
      }
    })
    if(App.isBelongToGoogle(appType)) {
      !this.auths.google && (this.auths.google = googleAuth)
      this.auths.google.addScope(appType)      
    }
    return this
  }

  run() {
    let promise_chain = new Promise((resolve, reject) => resolve())
    Object.keys(this.auths).forEach((key) => {
      promise_chain = promise_chain.then(() => this.auths[key].authorize())
    })

    this.chainable.forEach((spider) => {
      promise_chain = promise_chain.then(spider.fn)
    })
  }
}

module.exports = Mario