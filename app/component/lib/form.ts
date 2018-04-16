"use strict";

export function inputEffectInit(form: HTMLFormElement) {
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
