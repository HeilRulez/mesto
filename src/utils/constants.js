const configApi = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/',
    token: '4a7f2ab1-6764-4429-a44f-752ab22711db',
    type: 'application/json',
    cohort: 'cohort-42'
  },

  classCollection = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__btn-submit',
    inactiveButtonClass: 'form__btn-submit_disabled',
    errorId: '-error',
    inputStyleError: 'border-invalid',
    errorClass: '.form__text-error'
  },

  userData = {
    nameSelector: 'profile-info__name',
    descriptionSelector: 'profile-info__description',
    avatarSelector: 'profile__avatar'
  };

export {
  configApi,
  classCollection,
  userData
}
