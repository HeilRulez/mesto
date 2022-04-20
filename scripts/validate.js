const editForm = document.forms.editForm;
const addForm = document.forms.addForm;


const ERRORS = {
  valMis: "Вы пропустили это поле.",
  toLength: (min, max) => {
    return `Должно быть от ${min} до ${max} символов.`
  },
  typeMis: "Введите адрес сайта.",
};

function checkInputValidity(input) {
  input.setCustomValidity("");
  if (input.validity.valueMissing) {
    input.setCustomValidity(ERRORS.valMis);
  };
  if (input.validity.tooLong || input.validity.tooShort) {
    input.setCustomValidity(ERRORS.toLength(input.getAttribute("minlength"), input.getAttribute("maxlength")));
  };
  if (input.validity.typeMismatch && input.type === "url") {
    input.setCustomValidity(ERRORS.typeMis);
  };
};

function resetStyleInputError(target) {
  const allInputsInForm = Array.from(target.querySelectorAll('input'));
  allInputsInForm.forEach(input => {
    if (input.classList.contains('border-invalid')) {
      setInputStyleValid(input);
    }
  });
}

function insertErrorText(input) {
  const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
  checkInputValidity(input);
  errorElement.textContent = input.validationMessage;
};

function enableButton(button) {
  button.disabled = false;
  button.classList.remove('form__btn-submit_disabled');
};

function disableButton(button) {
  button.disabled = true;
  button.classList.add('form__btn-submit_disabled');
};

// Состояние кнопки
function setButtonState(button, isValid) {
  if (isValid) {
    enableButton(button);
  } else {
    disableButton(button);
  };
};

function setInputStyleValid(input) {
  input.classList.remove('border-invalid');
}

function setInputStyleInvalid(input) {
  input.classList.add('border-invalid');
}

// Красное подчёркивание инпута
function setStyleInput(input) {
  if (input.checkValidity()) {
    setInputStyleValid(input);
  } else {
    setInputStyleInvalid(input);
  }
}

// Обработка при вводе в инпут
function trackInput(evt) {
  const formElement = evt.currentTarget;
  const input = evt.target;
  const btnSubmit = formElement.querySelector('.form__btn-submit');
  insertErrorText(input);
  setButtonState(btnSubmit, formElement.checkValidity());
  setStyleInput(input);
};

function validityForm(evt) {
  evt.preventDefault();
  if (evt.target.checkValidity()) {
    switch (evt.target.name) {
      case "addForm":
        addNewCard(evt);
        break;
      case "editForm":
        saveData(evt);
        break;
    };
  }
};

function enableValidation(form) {
  form.addEventListener('input', trackInput, false);
  form.addEventListener('submit', validityForm, false);
}

enableValidation(editForm);
enableValidation(addForm);

