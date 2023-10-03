'use strict';

window.addEventListener("load", function () {
  document.getElementById("submit").addEventListener("click", function () {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let erreurMessage = document.querySelector(".erreurMessage");
  fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: { 
          'accept': 'application/json',
          'Content-Type': 'application/json'
      },

      body: JSON.stringify({
          'email': email.value,
          'password': password.value,
      })
})
      .then(response => { 
        if (response.ok) {
          return response.json(); 
        } 
        else {
          throw new Error(response.statusText);
        }
      })
      .then(data => {
        sessionStorage.setItem("token", data.token);
        window.location.href = "/FrontEnd/index.html";
      })
      .catch(error => {
        email.style.border = '1px solid red';
        password.style.border = '1px solid red';
        erreurMessage.style.display = 'block';
        console.error(error);
      });
  });
})
