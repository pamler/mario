const APP = require('./lib/constants')
const Mario = require('./lib/mario')

new Mario()
  .pipe('gmail', require('./lib/rules/readWufooGmailRule'))
  .run()
