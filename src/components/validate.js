//Функция инициализации валидации форм
function enableValidation (param) {
  const forms = document.querySelectorAll(param.formSelector);
  for (const form of forms) {
    form.setAttribute('novalidate', '');
    form.addEventListener('input', (evt) => validateForm (form, evt.target, param));
  }
}

//Функция валидации формы
function validateForm (form, target, param) {
  const button = form.submit;
  const msgSpan = form.querySelector(`.${target.name}-invalid`);
  validateInput(target, msgSpan, param);
  toggleSubmitBtn(form.checkValidity(), button, param);
}

//Функция валидации инпута
function validateInput (input, msgSpan, param) {
  msgSpan.textContent = input.validationMessage;
  if (input.validity.valid) {
    input.classList.remove(param.inputErrorClass);
    msgSpan.classList.remove(param.errorClass);
  } else {
    input.classList.add(param.inputErrorClass);
    msgSpan.classList.add(param.errorClass);
  }
}

//Функция переключения состояния кнопки
function toggleSubmitBtn (valid, button, param) {
  if (!valid) {
    button.classList.add(param.inactiveButtonClass);
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove(param.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

export { enableValidation, toggleSubmitBtn };
