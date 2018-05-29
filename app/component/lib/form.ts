"use strict";

export interface IInputElement {
  element: HTMLInputElement;
  errorElement: HTMLSpanElement;
  hasError?: boolean;
  validate: (value: string) => string | null;
}

export default class Form {
  private readonly rootElement: HTMLFormElement;
  private readonly inputMap: Map<string, IInputElement> = new Map<string, IInputElement>();

  constructor(root: HTMLFormElement, inputList: IInputElement[],
              onSubmit: (e: Event, inputValues: { [key: string]: string }) => void) {
    this.rootElement = root;
    inputEffectApply(this.rootElement);
    inputEffectInit(this.rootElement);

    inputList.forEach((input) => {
      this.inputMap.set(input.element.name, input);
      input.element.addEventListener("change", (e: Event) => {
        this.onInputChange(input.element.name, e.target["value"]);
      });
    });

    root.querySelector('input[type="submit"]').addEventListener("click", (e) => {
      const hasError = Array.from(this.inputMap.values()).filter((it) => it.hasError).length > 0;
      const inputValues = {};
      Array.from(this.inputMap.keys()).forEach((key) => {
        inputValues[key] = this.inputMap.get(key);
      });
      return hasError ? e.preventDefault() : onSubmit(e, inputValues);
    });
  }

  private onInputChange = (name: string, value: string) => {
    const inputElement = this.inputMap.get(name);
    if (inputElement.validate(value) !== null) {
      inputElement.hasError = true;
      inputElement.element.classList.add("input-error");
      // inputElement.errorElement.innerHTML = inputElement.validate(value);
    } else {
      inputElement.hasError = false;
      inputElement.element.classList.remove("input-error");
      // inputElement.errorElement.innerHTML = "";
    }
  }
}

function inputEffectInit(form: HTMLFormElement) {
  Array.prototype.forEach.call(form.querySelectorAll(".input-effect"), (input: HTMLInputElement) => {
    input.addEventListener("blur", (e) => {
      const target = e.target as HTMLInputElement;
      if (target.value === "") {
        target.classList.remove("input-effect_content");
      } else {
        target.classList.add("input-effect_content");
      }
    });
    const label = input.parentElement.querySelector("label") as HTMLLabelElement;
    label.addEventListener("click", (e) => {
      e.preventDefault();
      input.focus();
    });
  });
}

function inputEffectApply(form: HTMLFormElement) {
  Array.prototype.forEach.call(form.querySelectorAll(".input-effect"), (input: HTMLInputElement) => {
    if (input.value === "") {
      input.classList.remove("input-effect_content");
    } else {
      input.classList.add("input-effect_content");
    }
  });
}
