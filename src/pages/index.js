import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

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

const cardsContainer = '.cards';
const overlayForView = '.overlay_for_view';
const overlayForAddCard = '.overlay_for_addCard';
const overlayForProfile = '.overlay_for_profile';
const profileInfoBtn = document.querySelector('.profile-info__btn');
const profileAddBtn = document.querySelector('.profile__add-btn');

const modalImage = new PopupWithImage(overlayForView).handleCardClick;

function createCard(cardData) {
  return new Card(cardData, modalImage, '.sample-card').getCard();
}

const cards = new Section({items: cardsData, renderer: createCard}, cardsContainer);


function addNewCard() {
  return cards.addItem(createCard(cardData));
}

const formImage = new PopupWithForm(overlayForAddCard, addNewCard);



const userData = {
  nameSelector: '.profile-info__name',
  discriptionSelector: '.profile-info__discription'
};

const userInfo = new UserInfo(userData).setUserInfo;

const formProfile = new PopupWithForm(overlayForProfile, userInfo);




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

function openEditProfile() {
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

cards.renderAll();
