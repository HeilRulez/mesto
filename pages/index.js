let formContainer = document.querySelector('.form-container'),
  editForm = document.querySelector('.edit-form'),
  profileInfoBtn = document.querySelector('.profile-info__btn'),
  editFormClose = document.querySelector('.edit-form__close'),
  form = document.querySelector('.form'),
  formNameProfile = document.querySelector('.form__name-profile'),
  formDiscroptionProfile = document.querySelector('.form__discroption-profile'),
  profileInfoName = document.querySelector('.profile-info__name'),
  profileInfoDiscription = document.querySelector('.profile-info__discription');

function closeEditProfile() {
  editForm.classList.remove('visible');
  formContainer.classList.remove('visible');
  profileInfoBtn.addEventListener('click', openEditProfile, false);
  editFormClose.removeEventListener('click', closeEditProfile, false);
  formBtnSave.removeEventListener('click', saveData, false);
};

function openEditProfile() {
  formNameProfile.value = profileInfoName.textContent;
  formDiscroptionProfile.value = profileInfoDiscription.textContent;
  editForm.classList.add('visible');
  formContainer.classList.add('visible');
  editFormClose.addEventListener('click', closeEditProfile, false);
  profileInfoBtn.removeEventListener('click', openEditProfile, false);
  form.addEventListener('submit', saveData, false);
};

function saveData(evt) {
  evt.preventDefault();
  profileInfoName.textContent = formNameProfile.value;
  profileInfoDiscription.textContent = formDiscroptionProfile.value;
  closeEditProfile()
};

profileInfoBtn.addEventListener('click', openEditProfile, false);
