"use strict";

import Form, {IInputElement} from "../lib/form";
import * as validate from "../lib/validate";

const signUpScript = () => {
  const signUpForm: HTMLFormElement = document.querySelector(".signup-form");
  if (signUpForm) {
    const usernameInput: IInputElement = {
      element: signUpForm.querySelector('input[name="username"]'),
      errorElement: signUpForm.querySelector(".username__error"),
      validate: (value: string) => {
        return !validate.email(value) && !validate.phone(value) ? "Логин не валиден" : null;
      },
    };

    const passwordInput: IInputElement = {
      element: signUpForm.querySelector('input[name="password"]'),
      errorElement: signUpForm.querySelector(".password__error"),
      validate: (value: string) => {
        return (!value || value.length < 8) ? "Пароль должен быть не менее 8 символов длиной" : null;
      },
    };

    const passwordRepeatInput: IInputElement = {
      element: signUpForm.querySelector('input[name="password-repeat"]'),
      errorElement: signUpForm.querySelector(".password-repeat__error"),
      validate: (value: string) => {
        return (signUpForm.querySelector(".password__error")["value"] !== value) ? "Пароли должны совпадать" : null;
      },
    };

    const signUp = new Form(signUpForm, [usernameInput, passwordInput, passwordRepeatInput],
        (e, inputValues) => {
          e.preventDefault();
          console.log(JSON.stringify(inputValues));
        });
  }
};

if (document.getElementById("signup")) signUpScript();
