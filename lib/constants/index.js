const GOOGLE_FAMILY = ['gmail', 'drive']

module.exports = {
  GMAIL: 'gmail',

  isBelongToGoogle(type) {
    return GOOGLE_FAMILY.indexOf(type) !== -1
  }
}