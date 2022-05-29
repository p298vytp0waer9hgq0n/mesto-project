import { toggleSubmitBtn } from './modals.js';

//Функция инициализации валидации форм
function enableValidation (param) {
  const forms = document.querySelectorAll(param.formSelector);
  for (const form of forms) {
    validateForm(form, param);
  }
}

//Функция валидации формы
function validateForm (form, param) {
  form.setAttribute('novalidate', '');
  const inputs = Array.from(form.querySelectorAll(param.inputSelector));
  const button = form.querySelector(param.submitButtonSelector);
  form.addEventListener('input', (evt) => {
    const msgSpan = form.querySelector(`.${evt.target.name}-invalid`);
    validateInput(evt.target, msgSpan, param);
    validateButton(inputs, button, param);
  });
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

//Функция валидизации кнопки
function validateButton(inputs, button, param) {
  const invalid = inputs.some((input) => {
    return !input.validity.valid;
  });
  toggleSubmitBtn(!invalid, button, param);
}

export { enableValidation };