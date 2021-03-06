export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._name = document.querySelector(`.${nameSelector}`);
    this._description = document.querySelector(`.${descriptionSelector}`);
    this._avatar = document.querySelector(`.${avatarSelector}`);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    };
  }

  setUserInfo({name, about}) {
      this._name.textContent = name;
      this._description.textContent = about;
  }

  setUserAvatar({avatar}) {
    this._avatar.style.backgroundImage = `url("${avatar}")`;
  }
}
