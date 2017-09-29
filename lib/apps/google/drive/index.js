const google = require('googleapis')
const auth = require('../auth')

class Drive {
  constructor() {
    this.drive = google.drive('v3')
    this.oauth2Client = auth.getClient()
  }

  createDocInGoogleDrive(filename, buffer, mimeType) {
    const fileMetadata = {
      name: filename,
      mimeType: 'application/vnd.google-apps.document'
    };
    const media = {
      mimeType: mimeType || 'text/plain',
      body: buffer
    }
    return new Promise((resolve, reject) => {
      this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
        auth: this.oauth2Client,        
      }, (err, file) => {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          resolve(file.id)
        }
      })
    })
  }
}

module.exports = Drive