import Card from './card.js';

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

const overlayForView = document.querySelector('.overlay_for_view'),
  modalFormViewImg = document.querySelector('.modal-form__view-img'),
  modalFormTitleForView = document.querySelector('.modal-form__title_for_view');

const overlayVisible = 'overlay_visible';

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

function closeModalOnOverlay(modal) {
  if (modal.target.classList.contains(overlayVisible)) {
    closeModal(modal.target);
  }
}

function setListenerClose() {
  document.addEventListener('keydown', closeModalOnEsc, false);
  document.addEventListener('mousedown', closeModalOnOverlay, false);

}

function deleteListenerClose() {
  document.removeEventListener('keydown', closeModalOnEsc, false);
  document.removeEventListener('mousedown', closeModalOnOverlay, false);
}

function resetError(parent, obj) {
  const messagesArr = Array.from(parent.querySelectorAll('.form__text-error'));
  const allInputsInForm = Array.from(parent.querySelectorAll('input'));
  messagesArr.forEach(item => item.textContent = '');
  allInputsInForm.forEach(input => {
    if (input.classList.contains(obj.inputStyleError)) {
      setInputStyleValid(input, obj);
    }
  });
}

// Открытие любого модального окна
function openModal(modal) {
  modal.classList.add(overlayVisible);
  resetError(modal, classCollection);
  setListenerClose();
}

function resetForm(target) {
  target.reset();
}

// Форма данных профиля
function openEditProfile() {
  formNameForProfile.value = profileInfoName.textContent;
  formDataForProfile.value = profileInfoDiscription.textContent;
  openModal(overlayForProfile);
  const evt = new Event('input'); //немного костылей для кнопки
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
  resetForm(overlayForAddCard.querySelector('.form_for_addCard'));
  inactiveButton(overlayForAddCard);
}

// Добавление карточки в дом
function addCard(cardData) {
  const cardItem = new Card(cardData, '.sample-card');
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

// Отрисовка сохранённых карточек
cardsData.forEach(addCard);
