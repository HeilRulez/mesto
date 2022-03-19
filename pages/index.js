let formContainer = document.querySelector('.form-container'),
  editForm = document.querySelector('.edit-form'),
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  editFormClose = document.querySelector('.edit-form__close'),
  form = document.querySelector('.form'),
  formNameProfile = document.querySelector('.form__name-profile'),
  formDiscroptionProfile = document.querySelector('.form__discroption-profile'),
  profileInfoName = document.querySelector('.profile-info__name'),
  profileInfoDiscription = document.querySelector('.profile-info__discription'),
  profileAddBtn = document.querySelector('.profile__add-btn'),
  cards = document.querySelector('.cards');

  // let cardLike = document.querySelector('.card__like');

function closeEditProfile() {
  editForm.classList.remove('visible');
  formContainer.classList.remove('visible');
  profileInfoBtn.addEventListener('click', openEditProfile, false);
  editFormClose.removeEventListener('click', closeEditProfile, false);
  form.removeEventListener('click', saveData, false);
  // scrollWin(false);
};

function openEditProfile() {
  formNameProfile.value = profileInfoName.textContent;
  formDiscroptionProfile.value = profileInfoDiscription.textContent;
  editForm.classList.add('visible');
  formContainer.classList.add('visible');
  editFormClose.addEventListener('click', closeEditProfile, false);
  profileInfoBtn.removeEventListener('click', openEditProfile, false);
  form.addEventListener('submit', saveData, false);
  // scrollWin(true);
};

// function scrollWin(condition) {   /* Не возвращает скролл */
//   if (condition) {
//     window.addEventListener('scroll', (e) => {window.scrollTo(0,0);}, false);
//   }else{
//     window.removeEventListener('scroll', (e) => {}, false);
//   }
// };

function saveData(evt) {
  evt.preventDefault();
  profileInfoName.textContent = formNameProfile.value;
  profileInfoDiscription.textContent = formDiscroptionProfile.value;
  profileInfoDiscription.title = formDiscroptionProfile.value;
  closeEditProfile()
};

// function likeAktive() {                              Не работает
//   cardLike.classList.toggle('card__like_active');
// };
// cardLike.addEventListener('click', likeAktive, false);

profileInfoBtn.addEventListener('click', openEditProfile, false);
profileAddBtn.addEventListener('click', formAddContent, false);

let contentCards = [{
    src: './images/content/kar.png',
    title: 'Карачаевск'
  },
  {
    src: './images/content/elb.png',
    title: 'Гора Эльбрус'
  },
  {
    src: './images/content/dom.png',
    title: 'Домбай'
  }
];

function formAddContent() {
  alert('Функционал в разработке.');
  append(contentCards);
};

function append(obj) {
  for (let i = 0; i < obj.length; i++) {
    addContent(obj[i].src, obj[i].title);
  };
};

function addContent(foto, discr) {
  cards.insertAdjacentHTML('afterbegin', `<div class="card"><img src="${foto}" alt="Фото ${discr}"><div class="card__discription"><h1 class="card__title">${discr}</h1><svg class="card__like" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg"><pathd="M20.2991 9.78586C22.567 7.54338 22.567 3.90213 20.2991 1.68186C18.0311 -0.560619 14.3486 -0.560619 12.0806 1.68186L10.9804 2.792L9.88007 1.70406C7.61215 -0.560619 3.92957 -0.560619 1.6841 1.68186C0.583822 2.76979 0 4.21297 0 5.74496C0 7.27695 0.606277 8.72013 1.6841 9.80806L10.9804 19L20.2991 9.78586ZM1.4371 5.74496C1.4371 4.59042 1.8862 3.52469 2.71702 2.72539C3.5703 1.88168 4.67058 1.45983 5.77086 1.45983C6.87114 1.45983 7.97142 1.88168 8.8247 2.72539L10.9804 4.83465L13.136 2.70318C14.8201 1.03798 17.582 1.03798 19.2437 2.70318C20.0521 3.50248 20.5236 4.56821 20.5236 5.72276C20.5236 6.8773 20.0745 7.94303 19.2437 8.74233L10.9804 16.9351L2.71702 8.76453C1.90865 7.94303 1.4371 6.8773 1.4371 5.74496Z"fill="black" /></svg></div></div>`);
};

append(contentCards);

