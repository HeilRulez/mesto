export default class UserInfo {
  constructor({
    nameSelector,
    discriptionSelector
  }) {
    this._name = document.querySelector(nameSelector);
    this._discription = document.querySelector(discriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._name.value,
      discription: this._discription.value
    };
  }

  setUserInfo({name, discription}) {
    this._name.textContent = name;
    this._discription.textContent = discription;
  }
}
