import Card from './Card.js';
import FormValidator from './FormValidator.js';

const overlayForProfile = document.querySelector('.overlay_for_profile'),
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  forms = document.querySelectorAll('.form'),
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

const classCollection = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn-submit',
  inactiveButtonClass: 'form__btn-submit_disabled',
  errorClass: '-error',
  inputStyleError: 'border-invalid',
  errorClass: 'form__text-error'
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


function deleteListenerClose() {
  document.removeEventListener('keydown', closeModalOnEsc);
  document.removeEventListener('mousedown', closeModalOnOverlay);
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

function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains(overlayVisible)) {
    closeModal(evt.target);
  }
}

function setListenerClose() {
  document.addEventListener('keydown', closeModalOnEsc);
  document.addEventListener('mousedown', closeModalOnOverlay);
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
  resetError();    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

function inactiveButton(form) {
  const targetButton = form.querySelector('.form__btn-submit');
  targetButton.setAttribute("disabled", true);
  targetButton.classList.add('form__btn-submit_disabled');
}

// Форма добавления контента
function openAddCard() {
  openModal(overlayForAddCard);
  resetError();                     !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  resetForm(formForAddCard);
  inactiveButton(formForAddCard);
}

function handleCardClick(name, link) {
  this._modalFormViewImg.src = link;
  this._modalFormViewImg.alt = name;
  this._modalFormTitleForView.textContent = name;
  openModal(overlayForView);
}

// Добавление карточки в дом
function addCard(cardData) {
  const cardItem = new Card(cardData, handleCardClick, '.sample-card');
  cards.prepend(cardItem.getCard());
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


modalFormCloseAll.forEach((btnClose) => {
  btnClose.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('modal-form__close')) {
      closeModal(evt.target.closest('.overlay'));
    }
  });
});

// подключение валидации формам
forms.forEach(form => {
  const validation = new FormValidator(classCollection, form);
  validation.enableValidation();
});

// Отрисовка сохранённых карточек
cardsData.forEach(addCard);
