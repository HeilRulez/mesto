const overlayForProfile = document.querySelector('.overlay_for_profile'),
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  modalFormCloseForProfile = document.querySelector('.modal-form__close_for_profile'),
  formForProfile = document.querySelector('.form_for_profile'),
  formNameForProfile = document.querySelector('.form__name_for_profile'),
  formDataForProfile = document.querySelector('.form__data_for_profile'),
  profileInfoName = document.querySelector('.profile-info__name'),
  profileInfoDiscription = document.querySelector('.profile-info__discription');

const overlayForAddCard = document.querySelector('.overlay_for_addCard'),
  profileAddBtn = document.querySelector('.profile__add-btn'),
  modalFormCloseForAddCard = document.querySelector('.modal-form__close_for_addCard'),
  formForAddCard = document.querySelector('.form_for_addCard'),
  formNameForAddCard = document.querySelector('.form__name_for_addCard'),
  formDataForAddCard = document.querySelector('.form__data_for_addCard'),
  cards = document.querySelector('.cards'),
  sampleCard = document.querySelector('.sample-card').content;

const overlayForView = document.querySelector('.overlay_for_view'),
  modalFormViewImg = document.querySelector('.modal-form__view-img'),
  modalFormCloseForView = document.querySelector('.modal-form__close_for_view'),
  modalFormTitleForView = document.querySelector('.modal-form__title_for_view');

// Закрытие любого модального окна
function closeForm(evt) {
  evt.target.closest('.overlay').classList.remove('overlay_visible_on');
}

// Форма данных профиля
function openEditProfile(evt) {
  formNameForProfile.value = profileInfoName.textContent;
  formDataForProfile.value = profileInfoDiscription.textContent;
  overlayForProfile.classList.add('overlay_visible_on');
}

// Отправка данных профиля из формы на страницу
function saveData(evt) {
  evt.preventDefault();
  profileInfoName.textContent = formNameForProfile.value;
  profileInfoDiscription.textContent = formDataForProfile.value;
  closeForm(evt)
}

// Форма добавления контента
function openAddCard() {
  overlayForAddCard.classList.add('overlay_visible_on');
  formNameForAddCard.value = '';
  formDataForAddCard.value = '';
}

// Создание карточки контента из шаблона
function addCard(name='', data) {
  cardItem = sampleCard.querySelector('.card').cloneNode(true);
  cardItem.querySelector('.card__title').textContent = name;
  cardItem.querySelector('.card__img').src = data;
  cardItem.querySelector('.card__img').alt = name;
  cardItem.querySelector('.card__del').addEventListener('click', delCard, false);
  cardItem.querySelector('.card__like').addEventListener('click', likeCard, false);
  cardItem.querySelector('.card__img').addEventListener('click', scaleImg, false);
  cards.prepend(cardItem);
}

// Отправка контента на страницу
function btnAddCard(evt) {
  evt.preventDefault();
  let name = formNameForAddCard.value,
      data = formDataForAddCard.value;
  addCard(name, data);
  cardsData.push({name: name, link: data});
  closeForm(evt);
}

function delCard(evt) {
  evt.target.closest('.card').remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like_active");
}

// Увеличение картинки
function scaleImg(evt) {
  overlayForView.classList.add('overlay_visible_on');
  modalFormViewImg.src = evt.target.src;
  modalFormViewImg.alt = evt.target.alt;
  modalFormTitleForView.textContent = evt.target.alt;
}

profileInfoBtn.addEventListener('click', openEditProfile, false); //данные профиля
formForProfile.addEventListener('submit', saveData, false); // отправка данных профиля
profileAddBtn.addEventListener('click', openAddCard, false);  // выбор контента
formForAddCard.addEventListener('submit', btnAddCard, false);  // добавить контент на страницу
modalFormCloseForProfile.addEventListener('click', closeForm, false);
modalFormCloseForAddCard.addEventListener('click', closeForm, false);
modalFormCloseForView.addEventListener('click', closeForm, false);

const cardsData = [
  {
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
