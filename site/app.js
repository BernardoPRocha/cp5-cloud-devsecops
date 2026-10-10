"use strict";
const form = document.querySelector("#calculator");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = Number(document.querySelector("#quantity").value);
  const result = document.querySelector("#result");
  if (!Number.isSafeInteger(value) || value < 0 || value > 1000000) {
    result.textContent = "Informe um inteiro entre 0 e 1.000.000.";
    return;
  }
  result.textContent = `O dobro de ${value} é ${value * 2}.`;
});
