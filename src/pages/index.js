import * as cs from '../utils/constants.js';
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
  forms = document.querySelectorAll('.form'),
  cardsContainer = '.cards',
  overlayForView = '.overlay_for_view',
  overlayForAddCard = '.overlay_for_addCard',
  overlayForProfile = '.overlay_for_profile',
  overlayForDelCard = '.overlay_for_delCard',
  overlayForAvatar = '.overlay_for_avatar';

const formForValidation = {};
let userId = '';
let delCard = '';

const modalImage = new PopupWithImage(overlayForView);
const cards = new Section(createCard, cardsContainer);
const formImage = new PopupWithForm(overlayForAddCard, (item) => addCardToBase(item));

const api = new Api(cs.configApi);

function deleteCard() {
  return ({btn}) => {
    btn.textContent = 'Удаление...';
    api.reqDelCard(delCard.id)
    .then(() => {
      confirmDelete.close();
      delCard.remove();
    })
    .catch(err => console.error(`Ошибка ${err} при удалении карточки.`))
    .finally(() => btn.textContent = 'Да');
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
  .then(data => {
    formImage.close();
    cards.addItem(createCard(data), true)
  })
  .catch(err => console.error(`Ошибка ${err} при добавлении карточки.`))
  .finally(() => btn.textContent = 'Создать');
}

function handleLike(evt) {
  return (card) => {
  if(evt.target.classList.contains('card__like_active')) {
    api.handleLike('DELETE', evt)
    .then(data => {
      card.delLikeCard();
      card.countLiks(data.likes.length)
    })
    .catch(err => console.error(`Ошибка ${err} при снятии 'like'.`));
  }else{
    api.handleLike('PUT', evt)
    .then(data => {
      card.addLikeCard();
      card.countLiks(data.likes.length)
    })
    .catch(err => console.error(`Ошибка ${err} при установке 'like'.`));
  }
}
}

const userInfo = new UserInfo(cs.userData);

function sendData({name, about, btn}) {
  btn.textContent = 'Сохранение...';
  api.sendData(name, about)
  .then(data => {
    formProfile.close();
    userInfo.setUserInfo(data)
  })
  .catch(err => console.error(`Ошибка ${err} при отправке данных профиля.`))
  .finally(() => btn.textContent = 'Сохранить');
}

function selectionAvatar({link, btn}) {
  btn.textContent = 'Сохранение...';
  api.selectionAvatar(link)
  .then(data => {
    formAvatar.close();
    userInfo.setUserAvatar(data)
  })
  .catch(err => console.error(`Ошибка ${err} при обновлении фото профиля.`))
  .finally(() => btn.textContent = 'Сохранить');
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

forms.forEach(form => {
  const validator = new FormValidator(cs.classCollection, form);
  const formName = form.getAttribute('name');
  formForValidation[formName] = validator;
  validator.enableValidation();
});

formProfile.setEventListeners();
formImage.setEventListeners();
modalImage.setEventListeners();
confirmDelete.setEventListeners();
formAvatar.setEventListeners();

const resUserData = api.setDataUser()

const allCard = api.renderAllCards();

Promise.all([resUserData, allCard])
.then(res => {
    userInfo.setUserAvatar(res[0]);
    userInfo.setUserInfo(res[0]);
    userId = res[0]._id;
    cards.renderAll(res[1]);
  })
  .catch(err => console.error(`Ошибка ${err} при загрузке данных.`))
