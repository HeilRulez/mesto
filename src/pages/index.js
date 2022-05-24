import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import './index.css';

const cardsData = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const formNameForProfile = document.querySelector('.form__name_for_profile'),
  formDataForProfile = document.querySelector('.form__data_for_profile'),
  cardsContainer = '.cards',
  overlayForView = '.overlay_for_view',
  overlayForAddCard = '.overlay_for_addCard',
  overlayForProfile = '.overlay_for_profile',
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  profileAddBtn = document.querySelector('.profile__add-btn'),
  modalImage = new PopupWithImage(overlayForView);

function createCard(cardData) {
  return new Card(cardData, (name, link) => modalImage.open(name, link), '.sample-card').getCard();
}

const cards = new Section({items: null, renderer: createCard}, cardsContainer);

const formImage = new PopupWithForm(overlayForAddCard, (item) => cards.addItem(createCard(item)));

const userData = {
  nameSelector: 'profile-info__name',
  descriptionSelector: 'profile-info__description'
};
const userInfo = new UserInfo(userData);
const formProfile = new PopupWithForm(overlayForProfile, (item) => userInfo.setUserInfo(item));

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

cards.renderAll(cardsData);
formProfile.setEventListeners();
formImage.setEventListeners();
modalImage.setEventListeners();
