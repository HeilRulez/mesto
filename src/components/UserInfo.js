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

  setUserInfo({nameProfile, descriptionProfile}) {
    console.log({nameProfile, descriptionProfile});
    this._name.textContent = nameProfile;
    this._discription.textContent = descriptionProfile;
  }
}
