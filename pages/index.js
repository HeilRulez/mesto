let formContainer = document.querySelector('.form-container'),
  editForm = document.querySelector('.edit-form'),
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  editFormClose = document.querySelector('.edit-form__close'),
  form = document.querySelector('.form'),
  formNameProfile = document.querySelector('.form__name-profile'),
  formDiscroptionProfile = document.querySelector('.form__discroption-profile'),
  formBtnSave = document.querySelector('.form__btn-save'),
  profileInfoName = document.querySelector('.profile-info__name'),
  profileInfoDiscription = document.querySelector('.profile-info__discription'),
  profileAddBtn = document.querySelector('.profile__add-btn'),
  cards = document.querySelector('.cards');


function closeEditProfile() {
  editForm.classList.remove('visible');
  formContainer.classList.remove('visible');
  scrollWin(false);
};

function openEditProfile() {
  editForm.classList.add('visible');
  formContainer.classList.add('visible');
  scrollWin(true);
};

function scrollWin(condition) {   /* запрет скрола при открытом попапе */
  if (condition) {
    window.addEventListener('scroll', (e) => {window.scrollTo(0,0);}, false);
  }else{
    window.removeEventListener('scroll', (e) => {window.scrollTo(0,0);}, false);
  }
};

profileInfoBtn.addEventListener('click', openEditProfile, false);
editFormClose.addEventListener('click', closeEditProfile, false);
