"use strict";

import Form, {IInputElement} from "../lib/form";
import * as validate from "../lib/validate";

const loginScript = () => {
  const loginForm: HTMLFormElement = document.querySelector(".login-form");
  if (loginForm) {
    const usernameInput: IInputElement = {
      element: loginForm.querySelector('input[name="username"]'),
      errorElement: loginForm.querySelector(".username__error"),
      validate: (value: string) => {
        return !validate.email(value) && !validate.phone(value) ? "Логин не валиден" : null;
      },
    };

    const passwordInput: IInputElement = {
      element: loginForm.querySelector('input[name="password"]'),
      errorElement: loginForm.querySelector(".password__error"),
      validate: (value: string) => null,
    };

    const signUp = new Form(loginForm, [usernameInput, passwordInput],
        (e, inputValues) => {
          e.preventDefault();
          console.log(JSON.stringify(inputValues));
        });
  }
};

if (document.getElementById("login")) loginScript();
