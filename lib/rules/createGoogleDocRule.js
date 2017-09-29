module.exports = (app, data) => {
  app.createDocInGoogleDrive('test', Buffer.from(data, 'utf8'), 'text/html')
    .then((fileId) => {
      console.log(fileId)
    })
}