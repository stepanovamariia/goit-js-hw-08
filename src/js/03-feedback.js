const throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');
const inputEmailEl = document.querySelector('input[name="email"]');
const inputMessageEl = document.querySelector('textarea[name="message"]');

const saveInputValuesChangesThrottled = throttle(saveInputValuesChanges, 500);

formEl.addEventListener('input', saveInputValuesChangesThrottled);
formEl.addEventListener('submit', submitForm);

function saveInputValuesChanges() {
  const inputValues = {
    email: inputEmailEl.value,
    message: inputMessageEl.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(inputValues));
}

function getFormValues() {
  try {
    const getInputValues = localStorage.getItem('feedback-form-state');
    if (getInputValues) {
      const inputValues = JSON.parse(getInputValues);
      inputEmailEl.value = inputValues.email;
      inputMessageEl.value = inputValues.message;

      console.log(getInputValues);
    }
  } catch (error) {
    console.error('Помилка при отриманні даних зі сховища:', error);
  }
}

function submitForm(event) {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');
  const form = event.target;

  const email = form.elements.email.value;
  const message = form.elements.message.value;

  console.log({ Email: email, Message: message });

  form.reset();
}

getFormValues();
