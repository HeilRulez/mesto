const editForm = document.forms.editForm;
const addForm = document.forms.addForm;


const ERRORS = {
  valMis: "Необходимо заполнить это поле.",
  toLength: (min, max) => {return `Должно быть от ${min} до ${max} символов.`},
  typeMis: "Введите адрес ссылки.",
};

function arrayInput(form) {
  console.log("создание массива");
  console.log(form.elements);
  let arrErr = form.elements.filter((elem) => {elem.classList.className.endsWith("-error")});
  arrErr.forEach(item => item.textContent = "");
  console.log(arrErr);
}

function checkInputValidity(input) {
  input.setCustomValidity("");

  if (input.validity.valueMissing) {
    input.setCustomValidity(ERRORS.valMis);
    return false;
  };

  if (input.validity.tooLong || input.validity.tooShort) {
    input.setCustomValidity(ERRORS.toLength(input.getAttribute("minlength"), input.getAttribute("maxlength")));
    return false;
  };

  if (input.validity.typeMismatch && input.type === "url") {
    input.setCustomValidity(ERRORS.typeMis);
    return false;
  };

  return input.checkValidity();
};

function insertTextError(input) {
  const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
  checkInputValidity(input);
  errorElement.textContent = input.validationMessage;
};

function enableButton(button, classButton) {
  button.disabled = false;
  button.classList.remove(classButton);
};

function disabledButton(button, classButton) {
  button.disabled = true;
  button.classList.add(classButton);
};

// Состояние кнопки
function setButtonState(button, isValid) {
  if (isValid) {
    enableButton(button, 'form__btn-submit_disabled');
  } else {
    disabledButton(button, 'form__btn-submit_disabled');
  };
};

// Обработка при вводе в инпут
function inputTrack(evt) {
  const formElement = evt.currentTarget;
  const input = evt.target;
  const btnSubmit = formElement.querySelector('.form__btn-submit');
  insertTextError(input);
  setButtonState(btnSubmit, formElement.checkValidity());
};

function validityForm(evt) {
  evt.preventDefault();
  if (evt.target.checkValidity()) {
    switch (evt.target.name) {
      case "addForm":
        btnAddCard(evt);
        break;
      case "editForm":
        saveData(evt);
        break;
    };
  }
};


editForm.addEventListener('submit', validityForm, false);
addForm.addEventListener('submit', validityForm, false);

editForm.addEventListener('input', inputTrack, false);
addForm.addEventListener('input', inputTrack, false);
