const overlayForProfile = document.querySelector('.overlay_for_profile'),
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  modalFormCloseAll = document.querySelectorAll('.modal-form__close'),
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

const overlay_visible = 'overlay_visible';

// Закрытие любого модального окна
function closeModal(evt) {
  evt.classList.remove(overlay_visible);
  deleteListenerClose();
}

function closeModalOnEsc(evt) {
  if (evt.key === 'Escape') {
    Array.from(modalFormCloseAll).forEach((item) => {
      if (item.closest('.overlay').classList.contains(overlay_visible)) {
        closeModal(item.closest('.overlay'));
      }
    });
  }
}

function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains(overlay_visible)) {
    closeModal(evt.target);
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

function resetError(parent) {
  const messagesArr = Array.from(parent.querySelectorAll('.form__text-error'));
  messagesArr.forEach(item => item.textContent = '');
}

// Открытие любого модального окна
function openModal(modal) {
  modal.classList.add(overlay_visible);
  resetError(modal);
  setListenerClose();
}

function resetForm(target) {
  target.reset();
  resetStyleInputError(target);
}

// Форма данных профиля
function openEditProfile() {
  formNameForProfile.value = profileInfoName.textContent;
  formDataForProfile.value = profileInfoDiscription.textContent;
  openModal(overlayForProfile);
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
  resetForm(overlayForAddCard.querySelector('.form_for_addCard'));
  disableButton(overlayForAddCard.querySelector('.form__btn-submit'));
}

// Создание карточки контента из шаблона
function createCard(cardData) {
  const cardCopy = sampleCard.querySelector('.card').cloneNode(true);
  const lmgElement = cardCopy.querySelector('.card__img');
  cardCopy.querySelector('.card__title').textContent = cardData.name;
  lmgElement.src = cardData.link;
  lmgElement.alt = cardData.name;
  cardCopy.querySelector('.card__del').addEventListener('click', delCard, false);
  cardCopy.querySelector('.card__like').addEventListener('click', likeCard, false);
  lmgElement.addEventListener('click', () => scaleImg(cardData), false);
  return cardCopy;
}

// Добавление карточки в дом
function addCard(cardData) {
  const cardItem = createCard(cardData);
  cards.prepend(cardItem);
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

function delCard(evt) {
  evt.target.closest('.card').remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like_active");
}

// Увеличение картинки
function scaleImg(cardData) {
  modalFormViewImg.src = cardData.link;
  modalFormViewImg.alt = cardData.name;
  modalFormTitleForView.textContent = cardData.name;
  openModal(overlayForView);
}

profileInfoBtn.addEventListener('click', openEditProfile, false); //данные профиля
profileAddBtn.addEventListener('click', openAddCard, false); // выбор контента


modalFormCloseAll.forEach((btnClose) => {
  btnClose.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('modal-form__close')) {
      closeModal(evt.target.closest('.overlay'));
    }
  });
});

// Отрисовка сохранённых карточек
cardsData.forEach(item => addCard(item));
