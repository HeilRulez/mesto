import Card from './Card.js';
import FormValidator from './FormValidator.js';

const overlayForProfile = document.querySelector('.overlay_for_profile'),
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  modalFormCloseAll = document.querySelectorAll('.modal-form__close'),
  formForProfile = document.querySelector('.form_for_profile'),
  formNameForProfile = document.querySelector('.form__name_for_profile'),
  formDataForProfile = document.querySelector('.form__data_for_profile'),
  profileInfoName = document.querySelector('.profile-info__name'),
  profileInfoDiscription = document.querySelector('.profile-info__discription');

const overlayForAddCard = document.querySelector('.overlay_for_addCard'),
  profileAddBtn = document.querySelector('.profile__add-btn'),
  formForAddCard = document.querySelector('.form_for_addCard'),
  formNameForAddCard = document.querySelector('.form__name_for_addCard'),
  formDataForAddCard = document.querySelector('.form__data_for_addCard'),
  cards = document.querySelector('.cards');

const overlayForView = document.querySelector('.overlay_for_view');

const overlayVisible = 'overlay_visible';

const modals = document.querySelectorAll('.overlay');

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


function listenerClose(evt) {
  if (evt.target.classList.contains(overlayVisible)) {
    closeModal(evt.target);
  }
  if (evt.target.classList.contains('modal-form__close')) {
    closeModal(evt.target.closest('.overlay'));
  }
}

function deleteListenerClose() {
  document.removeEventListener('keydown', closeModalOnEsc);
  // document.removeEventListener('mousedown', closeModalOnOverlay);
  modals.forEach(modal => {
    modal.removeEventListener('mousedown', listenerClose)
  });
}

// Закрытие любого модального окна
function closeModal(modal) {
  modal.classList.remove(overlayVisible);
  deleteListenerClose();
}

function closeModalOnEsc(evt) {
  if (evt.key === 'Escape') {
    const modalVisible = document.querySelector(`.${overlayVisible}`);
    closeModal(modalVisible);
  }
}

function setListenerClose() {
  document.addEventListener('keydown', closeModalOnEsc);
  modals.forEach(modal => {
    modal.addEventListener('mousedown', listenerClose)
  });
}

// Открытие любого модального окна
function openModal(modal) {
  modal.classList.add(overlayVisible);
  setListenerClose();
}

function resetForm(target) {
  target.reset();
}

// Форма данных профиля
function openEditProfile() {
  formNameForProfile.value = profileInfoName.textContent;
  formDataForProfile.value = profileInfoDiscription.textContent;
  formForValidation.editForm.resetError();
  openModal(overlayForProfile);

  //немного костылей для кнопки
  const evt = new Event('input');
  formNameForProfile.dispatchEvent(evt);
  formDataForProfile.dispatchEvent(evt);
}

// Отправка данных профиля из формы на страницу
function saveData(evt) {
  profileInfoName.textContent = formNameForProfile.value;
  profileInfoDiscription.textContent = formDataForProfile.value;
  closeModal(evt.target.closest('.overlay'));
}

// Форма добавления контента
function openAddCard() {
  openModal(overlayForAddCard);
  resetForm(formForAddCard);
  formForValidation.addForm.resetError();
  formForValidation.addForm.inactiveButton();
}

function handleCardClick(name, link) {
  this._modalFormViewImg.src = link;
  this._modalFormViewImg.alt = name;
  this._modalFormTitleForView.textContent = name;
  openModal(overlayForView);
}

function createCard(cardData) {
  return new Card(cardData, handleCardClick, '.sample-card');
}

// Добавление карточки в дом
function addCard(cardData) {
  cards.prepend(createCard(cardData).getCard());
}

// Отправка контента на страницу
function addNewCard(evt) {
  const cardData = {
    name: formNameForAddCard.value,
    link: formDataForAddCard.value
  };
  addCard(cardData);
  closeModal(evt.target.closest('.overlay'));
}

profileInfoBtn.addEventListener('click', openEditProfile);
profileAddBtn.addEventListener('click', openAddCard);
formForProfile.addEventListener('submit', saveData);
formForAddCard.addEventListener('submit', addNewCard);

forms.forEach(form => {
  const validator = new FormValidator(classCollection, form);
  const formName = form.getAttribute('name');
  formForValidation[formName] = validator;
  validator.enableValidation();
});

// Отрисовка сохранённых карточек
cardsData.forEach(addCard);
