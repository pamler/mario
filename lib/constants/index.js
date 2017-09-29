const GOOGLE_FAMILY = ['gmail', 'drive']

module.exports = {
  GMAIL: 'gmail',
  DRIVE: 'drive',

  isBelongToGoogle(type) {
    return GOOGLE_FAMILY.indexOf(type) !== -1
  }
}