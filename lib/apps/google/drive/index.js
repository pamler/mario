const google = require('googleapis')
const auth = require('../auth')

class Drive {
  constructor() {
    this.drive = google.drive('v3')
    this.oauth2Client = auth.getClient()
  }

  createFolderInGoogleDrive(path) {
    const createFolder = (parentId, folderArray, resolve) => {
      let fileMetadata = {
        'name': folderArray[0],
        'mimeType': 'application/vnd.google-apps.folder'
      };
      parentId && (fileMetadata.parents = [parentId])

      this.drive.files.create({
        resource: fileMetadata,
        fields: 'id',
        auth: this.oauth2Client,
      }, (err, file) => {
        if (err) {
          console.error(err);
        } else {
          folderArray.splice(0, 1)
          if(folderArray.length > 0) {
            createFolder(file.id, folderArray, resolve)            
          } else {
            resolve(file.id)
          }
        }
      });
    }
    return new Promise((resolve, reject) => createFolder('', path, resolve))
  }

  createDocInGoogleDrive(filename, folderId, buffer, mimeType) {
    const fileMetadata = {
      name: filename,
      mimeType: 'application/vnd.google-apps.document'
    };
    folderId && (fileMetadata.parents = [folderId])

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