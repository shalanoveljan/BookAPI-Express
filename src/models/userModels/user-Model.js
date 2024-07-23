class UserModel {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
  }
  static mapAll(datas) {
    return datas.map(data => new UserModel(data));
  }
  static mapOne(data) {
    return new UserModel(data);
  }
}
module.exports = UserModel;