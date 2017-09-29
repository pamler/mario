const Mario = require('./lib/mario')

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

new Mario()
  .pipe('gmail', require('./lib/rules/readWufooGmailRule'))
  .pipe('drive', require('./lib/rules/createGoogleDocRule'))
  .run()
