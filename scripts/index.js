const overlayForProfile = document.querySelector('.overlay_for_profile'),
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  modalFormClose = document.querySelectorAll('.modal-form__close'),
  formNameForProfile = document.querySelector('.form__name_for_profile'),
  formDataForProfile = document.querySelector('.form__data_for_profile'),
  profileInfoName = document.querySelector('.profile-info__name'),
  profileInfoDiscription = document.querySelector('.profile-info__discription');

const overlayForAddCard = document.querySelector('.overlay_for_addCard'),
  profileAddBtn = document.querySelector('.profile__add-btn'),
  formNameForAddCard = document.querySelector('.form__name_for_addCard'),
  formDataForAddCard = document.querySelector('.form__data_for_addCard'),
  cards = document.querySelector('.cards'),
  sampleCard = document.querySelector('.sample-card').content;

const overlayForView = document.querySelector('.overlay_for_view'),
  modalFormViewImg = document.querySelector('.modal-form__view-img'),
  modalFormTitleForView = document.querySelector('.modal-form__title_for_view');

// Закрытие любого модального окна
function closeForm() {
  const arrForClose = Array.from(document.querySelectorAll('.overlay'));
  arrForClose.forEach(item => item.classList.remove('overlay_visible'));
  closeDel();
}

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    closeForm();
  }
}

function closeOverlay(evt) {
  if (evt.target.classList.contains('overlay')) {
    closeForm();
  }
}

function closeSet() {
  document.addEventListener('keydown', closeEsc, false);
  document.addEventListener('click', closeOverlay, false);
}

function closeDel() {
  document.removeEventListener('keydown', closeEsc, false);
  document.removeEventListener('click', closeOverlay, false);
}

// Открытие любого модального окна
function openModal(modal) {
  modal.classList.add('overlay_visible');
  resetError(modal);
  closeSet();
}

function resetError(parent) {
  const messagesArr = Array.from(parent.querySelectorAll('.form__text-error'));
  messagesArr.forEach(item => item.textContent = '');
}

function resetForm(terget) {
  terget.reset();
}

// Форма данных профиля
function openEditProfile() {
  openModal(overlayForProfile);
  formNameForProfile.value = profileInfoName.textContent;
  formDataForProfile.value = profileInfoDiscription.textContent;
  closeSet();
}

// Отправка данных профиля из формы на страницу
function saveData(evt) {
  profileInfoName.textContent = formNameForProfile.value;
  profileInfoDiscription.textContent = formDataForProfile.value;
  closeForm();
}

// Форма добавления контента
function openAddCard() {
  openModal(overlayForAddCard);
  resetForm(overlayForAddCard.querySelector('.form_for_addCard'));
  disabledButton(overlayForAddCard.querySelector('.form__btn-submit'));
}

// Создание карточки контента из шаблона
function createCard(data, name = '') {
  const cardCopy = sampleCard.querySelector('.card').cloneNode(true);
  cardCopy.querySelector('.card__title').textContent = name;
  cardCopy.querySelector('.card__img').src = data;
  cardCopy.querySelector('.card__img').alt = name;
  cardCopy.querySelector('.card__del').addEventListener('click', delCard, false);
  cardCopy.querySelector('.card__like').addEventListener('click', likeCard, false);
  cardCopy.querySelector('.card__img').addEventListener('click', scaleImg, false);
  return cardCopy;
}

// Добавление карточки в дом
function addCard(name, data) {
  const cardItem = createCard(data, name);
  cards.prepend(cardItem);
}

// Отправка контента на страницу
function btnAddCard(evt) {
  const name = formNameForAddCard.value,
    data = formDataForAddCard.value;
  addCard(name, data);
  addDataInbase(cardsData, name, data);
  closeForm();
}

// Тут дожна бфть отправка на сервер
function addDataInbase(item, name, data) {
  item.push({
    name: name,
    link: data
  });
}

function delCard(evt) {
  evt.target.closest('.card').remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like_active");
}

// Увеличение картинки
function scaleImg(evt) {
  openModal(overlayForView);
  modalFormViewImg.src = evt.target.src;
  modalFormViewImg.alt = evt.target.alt;
  modalFormTitleForView.textContent = evt.target.alt;
}

profileInfoBtn.addEventListener('click', openEditProfile, false); //данные профиля
profileAddBtn.addEventListener('click', openAddCard, false); // выбор контента


modalFormClose.forEach((btnClose) => {
  btnClose.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('modal-form__close')) {
      closeForm();
    }
  });
});

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

// Отрисовка сохранённых карточек
cardsData.forEach((item) => addCard(item.name, item.link));
