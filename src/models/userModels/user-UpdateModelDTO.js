class UserUpdateModelDTO {
  constructor(data) {
    this.id = data.id
    this.username = data.username
    this.password = data.password
  }
}
module.exports = UserUpdateModelDTO