import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDel from '../components/PopupDel.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import './index.css';

const itMe = '4a7f2ab1-6764-4429-a44f-752ab22711db';

const formNameForProfile = document.querySelector('.form__name_for_profile'),
  formDataForProfile = document.querySelector('.form__data_for_profile'),
  cardsContainer = '.cards',
  overlayForView = '.overlay_for_view',
  overlayForAddCard = '.overlay_for_addCard',
  overlayForProfile = '.overlay_for_profile',
  overlayForDelCard = '.overlay_for_delCard',
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  profileAddBtn = document.querySelector('.profile__add-btn'),
  modalImage = new PopupWithImage(overlayForView);

let userId = '';

function deleteCard() {
  return (idCard) => {
    console.log(idCard);
    fetch(`https://mesto.nomoreparties.co/v1/cohort-42/cards/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: itMe
    }
  })
  // .then(res => {
  //   if(res.ok) {
  //     cards.delItem(idCard)
  //   }
  // })
  .catch(err => console.error(`Ошибка ${err} при удалении карточки.`));
  }
}

const confirmDelete = new PopupDel(overlayForDelCard, deleteCard());

function handleLike(evt) {
  return (card) => {

  if(evt.target.classList.contains('card__like_active')) {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-42/cards/${evt.target.closest('.card').id}/likes`, {
    method: 'DELETE',
    headers: {
      authorization: itMe,
    }
    })
    .then(res => {
      if(res.ok) {
        card.delLikeCard();
        return res.json()
      }
    })
    .then(data => card.countLiks(data.likes.length))
    .catch(err => console.error(`Ошибка ${err} при снятии 'like'.`));
  }else{
  fetch(`https://mesto.nomoreparties.co/v1/cohort-42/cards/${evt.target.closest('.card').id}/likes`, {
    method: 'PUT',
    headers: {
      authorization: itMe,
    }
    })
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

const objectForCard = {
  handleCardClick: (name, link) => modalImage.open(name, link),
  handleDelete: (card) => confirmDelete.open(card),
  handleLike: (evt) => handleLike(evt),
  template: '.sample-card'
};

function createCard(cardData) {
  return new Card(cardData, objectForCard, userId).getCard();
}

const cards = new Section({items: null, renderer: createCard}, cardsContainer);


function addCardToBase(cardData) {
  fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
    method: 'POST',
    headers: {
      authorization: itMe,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then(res => res.json())
  .then(data => cards.addItem(createCard(data)))  //Не одновляется DOM
  .catch(err => console.error(`Ошибка ${err} при добавлении карточки.`));
}

const formImage = new PopupWithForm(overlayForAddCard, (item) => addCardToBase(item));

const userData = {
  nameSelector: 'profile-info__name',
  descriptionSelector: 'profile-info__description',
  avatarSelector: 'profile__avatar'
};
const userInfo = new UserInfo(userData);

function sendData({name, about}) {
  fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me', {
    method: 'PATCH',
    headers: {
      authorization: itMe,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => res.json())
  .then(data => userInfo.setUserInfo(data))
  .catch(err => console.error(`Ошибка ${err} при отправке данных профиля.`));
}

const formProfile = new PopupWithForm(overlayForProfile, (item) => sendData(item));

const forms = document.querySelectorAll('.form'),
  formForValidation = {};

const classCollection = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn-submit',
  inactiveButtonClass: 'form__btn-submit_disabled',
  errorId: '-error',
  inputStyleError: 'border-invalid',
  errorClass: '.form__text-error'
};

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

profileInfoBtn.addEventListener('click', openEditProfile);
profileAddBtn.addEventListener('click', openAddCard);

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


fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
  headers: {
    authorization: itMe
  }
  })
  .then(res => res.json())
  .then(data => cards.renderAll(data))
  .catch(err => console.error(`Ошибка ${err} при загрузке карточек.`));

fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me', {
  headers: {
    authorization: itMe
  }
  })
  .then(res => res.json())
  .then(userData => {
    userInfo.setUserAvatar(userData);
    userInfo.setUserInfo(userData);
    userId = userData._id;
  })
  .catch(err => console.error(`Ошибка ${err} при загрузке данных профиля.`));;

