const { hash } = window.location; // destructuring hash that store the encrypted massage

const massage = atob(hash.replace("#", ""));

if (massage) {
  document.querySelector("#massage-form").classList.add("hide");
  document.querySelector("#massage-show").classList.remove("hide");

  document.querySelector("h2").innerHTML = massage;
}

document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();

  // toogling the hide class from materialize framework to hide the form after user click create and show link div
  document.querySelector("#massage-form").classList.add("hide");
  document.querySelector("#massage-link").classList.remove("hide");

  const massageInput = document.querySelector("#massage-input");
  const linkInput = document.querySelector("#link-input");

  // btoa() is inbuild func in js it stand's for 'binary to ASCII' it encode ASCII to based64 character encoding
  // atob() "ASCII to binary"
  const encrypted = btoa(massageInput.value);

  //window.location if in console is a big object but if it used inside a backtick it will return only the htmlURl
  linkInput.value = `${window.location}#${encrypted}`;
  // select() make user easier to select the link and automaticly block it to copy it
  linkInput.select();
});
