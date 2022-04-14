const editForm = document.forms.editForm;
const addForm = document.forms.addForm;


function checkInputValidity(input) {
  input.setCustomValidity("");

  if(input.validity.valueMissing) {
    input.setCustomValidity("Необходимо заполнить это поле.");
    return false;
  };

  if(input.validity.tooLong || input.validity.tooShort) {
    input.setCustomValidity(`Должно быть от ${input.getAttribute("minlength")} до ${input.getAttribute("maxlength")} символов.`);
    return false;
  };

  if(input.validity.typeMismatch && input.type === "url") {
    input.setCustomValidity('Введите адрес ссылки.');
    return false;
  };

  return input.checkValidity();
};

function insertTextError(input) {
  const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
  checkInputValidity(input);
  errorElement.textContent = input.validationMessage;
};

// Обработка при вводе в инпут
function inputTrack(evt) {
  const input = evt.target;
  insertTextError(input);

};

// Обработчик проверяющий валидность формы при сабмите
function validityForm(evt) {
  evt.preventDefault();

  if(evt.target.checkValidity()) {
    evt.target.resrt();
  }
};


editForm.addEventListener('submit', validityForm, false);
addForm.addEventListener('submit', validityForm, false);

editForm.addEventListener('input', inputTrack, false);
addForm.addEventListener('input', inputTrack, false);
