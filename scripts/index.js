const formContProf = document.querySelector('.form-container.prof'),
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  editFormCloseProf = document.querySelector('.edit-form__close.prof'),
  formProf = document.querySelector('.form.prof'),
  formNameProfile = document.querySelector('.form__name-profile.prof'),
  formDiscroptionProfile = document.querySelector('.form__discroption-profile.prof'),
  profileInfoName = document.querySelector('.profile-info__name'),
  profileInfoDiscription = document.querySelector('.profile-info__discription');

const formContAdd = document.querySelector('.form-container.addCard'),
  profileAddBtn = document.querySelector('.profile__add-btn'),
  editFormCloseAdd = document.querySelector('.edit-form__close.addCard'),
  formAdd = document.querySelector('.form.addCard'),
  formNameCard = document.querySelector('.form__name-profile.addCard'),
  formData = document.querySelector('.form__discroption-profile.addCard'),
  cards = document.querySelector('.cards'),
  sampleCard = document.querySelector('.sample-card').content;

const formContScaleImg = document.querySelector('.form-container.scaleImg'),
  scaleImgForm = document.querySelector('.scaleImg-form'),
  editFormCloseScaleImg = document.querySelector('.edit-form__close.scaleImg'),
  scaleImgFormTitle = document.querySelector('.scaleImg-form__title');

profileInfoBtn.addEventListener('click', openEditProfile, false); //данные профиля
formProf.addEventListener('submit', saveData, false); // отправка данных профиля
profileAddBtn.addEventListener('click', openAddCard, false);  // выбор контента
formAdd.addEventListener('submit', btnAddCard, false);  // добавить контент на страницу
editFormCloseProf.addEventListener('click', closeForm, false);
editFormCloseAdd.addEventListener('click', closeForm, false);
editFormCloseScaleImg.addEventListener('click', closeForm, false);


// Закрытие любого модального окна
function closeForm(evt) {
  evt.target.closest('.form-container').classList.remove('visible');
}

// Форма данных профиля
function openEditProfile() {
  formNameProfile.value = profileInfoName.textContent;
  formDiscroptionProfile.value = profileInfoDiscription.textContent;
  formContProf.classList.add('visible');
}

// Отправка данных профиля из формы на страницу
function saveData(evt) {
  evt.preventDefault();
  profileInfoName.textContent = formNameProfile.value;
  profileInfoDiscription.textContent = formDiscroptionProfile.value;
  closeForm(evt)
}

// Форма добавления контента
function openAddCard() {
  formContAdd.classList.add('visible');
  formNameCard.value = '';
  formData.value = '';
}

// Отправка контента на страницу
function btnAddCard(evt) {
  evt.preventDefault();
  let name = formNameCard.value,
      data = formData.value;
  addCard(name, data);
  cardsData.push({name: name, link: data});
  closeForm(evt);
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

function delCard(evt) {
  evt.target.closest('.card').remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like_active");
}

// Увеличение картинки
function scaleImg(evt) {
  formContScaleImg.classList.add('visible');
  scaleImgForm.style.backgroundImage = `url(${evt.target.src})`;
  scaleImgFormTitle.textContent = evt.target.alt;
}


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
