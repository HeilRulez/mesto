import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import './index.css';

const formNameForProfile = document.querySelector('.form__name_for_profile'),
  formDataForProfile = document.querySelector('.form__data_for_profile'),
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  profileAddBtn = document.querySelector('.profile__add-btn'),
  profileAvatar = document.querySelector('.profile__avatar'),
  cardsContainer = '.cards',
  overlayForView = '.overlay_for_view',
  overlayForAddCard = '.overlay_for_addCard',
  overlayForProfile = '.overlay_for_profile',
  overlayForDelCard = '.overlay_for_delCard',
  overlayForAvatar = '.overlay_for_avatar';

let userId = '';
let delCard = '';

const modalImage = new PopupWithImage(overlayForView);
const cards = new Section(createCard, cardsContainer);
const formImage = new PopupWithForm(overlayForAddCard, (item) => addCardToBase(item));

const configApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/',
  token: '4a7f2ab1-6764-4429-a44f-752ab22711db',
  type: 'application/json',
  cohort: 'cohort-42'
}
const api = new Api(configApi);

function deleteCard() {
  return ({btn}) => {
    btn.textContent = 'Удаление...';
    api.reqDelCard(delCard.id)
    .then(res => {
      btn.textContent = 'Да';
      if(res.ok) {
        confirmDelete.close();
        cards.delItem(delCard);
      }else{
        return new Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch(err => console.error(`Ошибка ${err} при удалении карточки.`));
  }
}

const confirmDelete = new PopupWithForm(overlayForDelCard, deleteCard());

function openDelete(evt) {
  confirmDelete.open();
  delCard = evt.target.closest('.card');
}

const objectForCard = {
  handleCardClick: (name, link) => modalImage.open(name, link),
  handleDelete: (evt) => openDelete(evt),
  handleLike: (evt) => handleLike(evt),
  template: '.sample-card'
};

function createCard(cardData) {
  return new Card(cardData, objectForCard, userId).getCard();
}

function addCardToBase({name, link, btn}) {
  btn.textContent = 'Создание...';
  api.getAllCards({name, link})
  .then(res => {
    btn.textContent = 'Создать';
    if(res.ok) {
      formImage.close();
      return res.json()
    }else{
      return new Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then(data => cards.addItem(createCard(data), true))
  .catch(err => console.error(`Ошибка ${err} при добавлении карточки.`));
}

function handleLike(evt) {
  return (card) => {
  if(evt.target.classList.contains('card__like_active')) {
    api.handleLike('DELETE', evt)
    .then(res => {
      if(res.ok) {
        card.delLikeCard();
        return res.json()
      }
    })
    .then(data => card.countLiks(data.likes.length))
    .catch(err => console.error(`Ошибка ${err} при снятии 'like'.`));
  }else{
    api.handleLike('PUT', evt)
    .then(res => {
      if(res.ok) {
        card.addLikeCard();
        return res.json()
      }
    })
    .then(data => card.countLiks(data.likes.length))
    .catch(err => console.error(`Ошибка ${err} при установке 'like'.`));
  }
}
}

const userData = {
  nameSelector: 'profile-info__name',
  descriptionSelector: 'profile-info__description',
  avatarSelector: 'profile__avatar'
};
const userInfo = new UserInfo(userData);

function sendData({name, about, btn}) {
  btn.textContent = 'Сохранение...';
  api.sendData(name, about)
  .then(res => {
    btn.textContent = 'Сохранить';
    if(res.ok) {
      formProfile.close();
      return res.json()
    }else{
      return new Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then(data => userInfo.setUserInfo(data))
  .catch(err => console.error(`Ошибка ${err} при отправке данных профиля.`));
}

function selectionAvatar({link, btn}) {
  btn.textContent = 'Сохранение...';
  api.selectionAvatar(link)
  .then(res => {
    btn.textContent = 'Сохранить';
    if(res.ok) {
      formAvatar.close();
      return res.json()
    }else{
      return new Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .then(data => userInfo.setUserAvatar(data))
  .catch(err => console.error(`Ошибка ${err} при обновлении фото профиля.`));
}

const formProfile = new PopupWithForm(overlayForProfile, (item) => sendData(item));

const formAvatar = new PopupWithForm(overlayForAvatar, (item) => selectionAvatar(item));

function setValueProfile() {
  const data = userInfo.getUserInfo();
  formNameForProfile.value = data.name;
  formDataForProfile.value = data.description;
}

function openEditProfile() {
  setValueProfile();
  formProfile.open();
  formForValidation.editForm.resetValidation();
}

function openAddCard() {
  formImage.open();
  formForValidation.addForm.resetValidation();
}

function editAvatarForm() {
  formAvatar.open();
  formForValidation.avatarForm.resetValidation();
}

profileInfoBtn.addEventListener('click', openEditProfile);
profileAddBtn.addEventListener('click', openAddCard);
profileAvatar.addEventListener('click', editAvatarForm);


const classCollection = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn-submit',
  inactiveButtonClass: 'form__btn-submit_disabled',
  errorId: '-error',
  inputStyleError: 'border-invalid',
  errorClass: '.form__text-error'
};


const forms = document.querySelectorAll('.form'),
  formForValidation = {};

forms.forEach(form => {
  const validator = new FormValidator(classCollection, form);
  const formName = form.getAttribute('name');
  formForValidation[formName] = validator;
  validator.enableValidation();
});

formProfile.setEventListeners();
formImage.setEventListeners();
modalImage.setEventListeners();
confirmDelete.setEventListeners();
formAvatar.setEventListeners();

api.setDataUser()
.then(res => {
  if(res.ok) {
    return res.json()
  }else{
    return new Promise.reject(`Ошибка: ${res.status}`);
  }
})
.then(userData => {
  userInfo.setUserAvatar(userData);
  userInfo.setUserInfo(userData);
  userId = userData._id;
})
.catch(err => console.error(`Ошибка ${err} при загрузке данных профиля.`));

api.renderAllCards()
.then(res => {
  if(res.ok) {
    return res.json()
  }else{
    return new Promise.reject(`Ошибка: ${res.status}`);
  }
})
.then(data => cards.renderAll(data))
.catch(err => console.error(`Ошибка ${err} при загрузке карточек.`));

