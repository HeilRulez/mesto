const formContainer = document.querySelector('.form-container'),
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  editFormClose = document.querySelector('.edit-form__close'),
  form = document.querySelector('.form'),
  formNameProfile = document.querySelector('.form__name-profile'),
  formDiscroptionProfile = document.querySelector('.form__discroption-profile'),
  profileInfoName = document.querySelector('.profile-info__name'),
  profileInfoDiscription = document.querySelector('.profile-info__discription');

function closeEditProfile() {
  formContainer.classList.remove('visible');
};

function openEditProfile() {
  formNameProfile.value = profileInfoName.textContent;
  formDiscroptionProfile.value = profileInfoDiscription.textContent;
  formContainer.classList.add('visible');
};

function saveData(evt) {
  evt.preventDefault();
  profileInfoName.textContent = formNameProfile.value;
  profileInfoDiscription.textContent = formDiscroptionProfile.value;
  closeEditProfile()
};

profileInfoBtn.addEventListener('click', openEditProfile, false);
editFormClose.addEventListener('click', closeEditProfile, false);
form.addEventListener('submit', saveData, false);
