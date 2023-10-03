'use strict';

// ********************* CONSTANTS *********************

const emailElt         = document.getElementById("email");
const passwordElt      = document.getElementById("password");
const submitButtonElt  = document.getElementById("submit");
const erreurMessageElt = document.querySelector(".error");

// ********************* FUNCTIONS *********************

async function login() {
  let email    = emailElt.value;
  let password = passwordElt.value;

  const URL     = "http://localhost:5678/api/users/login";
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': email,
      'password': password,
    })
  };

  const response = await fetch(URL, options);

  if (response.ok) {
    let data = await response.json();
    localStorage.setItem("token", data.token);
    window.location.href = "../index.html";

  } else {
    emailElt.style.border = '1px solid red';
    passwordElt.style.border = '1px solid red';
    erreurMessageElt.style.display = 'block';
  }
}

// ********************* MAIN *********************

submitButtonElt.addEventListener("click", login);
