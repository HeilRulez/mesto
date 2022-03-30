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

function closeEditProfile() {
  formContProf.classList.remove('visible');
}

function openEditProfile() {
  formNameProfile.value = profileInfoName.textContent;
  formDiscroptionProfile.value = profileInfoDiscription.textContent;
  formContProf.classList.add('visible');
}

function saveData(evt) {
  evt.preventDefault();
  profileInfoName.textContent = formNameProfile.value;
  profileInfoDiscription.textContent = formDiscroptionProfile.value;
  closeEditProfile()
}

profileInfoBtn.addEventListener('click', openEditProfile, false);
editFormCloseProf.addEventListener('click', closeEditProfile, false);
formProf.addEventListener('submit', saveData, false);

function openAddCard() {
  formContAdd.classList.add('visible');
  formNameCard.value = '';
  formData.value = '';
}

function closeAddCard() {
  formContAdd.classList.remove('visible');
}

function btnAddCard(evt) {
  evt.preventDefault();
  let name = formNameCard.value,
      data = formData.value;
  addCard(name, data);
  cardsData.push({name: name, link: data});
  closeAddCard();
}

function addCard(name='', data) {
  cardItem = sampleCard.querySelector('.card').cloneNode(true);
  cardItem.querySelector('.card__title').textContent = name;
  cardItem.querySelector('.card__img').src = data;
  cardItem.querySelector('.card__img').alt = `Фото. ${name}`;
  cardItem.querySelector('.card__del').addEventListener('click', delCard, false);
  cards.append(cardItem);
}

function delCard(evt) {
  let itemCard = null;
  cardsData.forEach(el => {
    // console.log(evt.target.closest('.card').querySelector('.card__img').src);
    if (el.link === evt.target.closest('.card').querySelector('.card__img').src) {
      console.log(el.indexOf());  // ???????
      itemCard = el.indexOf();
    }
  });
  evt.target.closest('.card').remove();

  cardsData.splice(itemCard, 1);
}

profileAddBtn.addEventListener('click', openAddCard, false);
editFormCloseAdd.addEventListener('click', closeAddCard, false);
formAdd.addEventListener('submit', btnAddCard, false);


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

cardsData.forEach((item) => addCard(item.name, item.link));
