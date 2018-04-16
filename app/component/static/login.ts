"use strict";

import {inputEffectInit} from "../lib/form";

(() => {
  const loginForm: HTMLFormElement = document.querySelector(".login-form");
  if (!loginForm) { return; }

  inputEffectInit(loginForm);
})();
