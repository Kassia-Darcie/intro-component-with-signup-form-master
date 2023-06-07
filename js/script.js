let Validator = {
  handleSubmit: e => {
    e.preventDefault();
    let send = true;

    let inputs = form.querySelectorAll("input");
    Validator.clearErrors()
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = Validator.checkInput(input);
      if (check !== true) {
        send = false;
        Validator.showError(input, check)
      }
    }

    if (send) {
      form.submit();
    }
  },

  checkInput(input) {
    const inputName = input.name;
    console.log(input.value);

    if (input.value === '') {
      return `${input.placeholder} cannot be empty`
    } else {
      switch (inputName) {
        case "email":
          const pattern = /^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]{2,}$/;
          if (!pattern.test(input.value)) {
						return 'Looks like this is not an email';
					}
          break;
      }
    }

    return true;
  },

  showError(input, check) {
		input.classList.add('error');
		let errorTxt = document.createElement('div');
		errorTxt.innerText = check;
		errorTxt.classList.add('error-msg');

    input.closest('.input-container').querySelector('.error-icon').classList.add("show");
		console.log(input.closest('.input-container'));

		input.insertAdjacentElement('afterend', errorTxt);
	},

  clearErrors() {
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => input.classList.remove("error"));
    const errors = form.querySelectorAll(".error-msg");
    errors.forEach(item => item.remove());
    const icons = form.querySelectorAll('.error-icon');
    icons.forEach(icon => icon.classList.remove('show'))
  }
}

const form = document.querySelector('form');

form.addEventListener('submit', Validator.handleSubmit);