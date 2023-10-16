'use strict';

// ********************* CONSTANTS *********************



// ********************* VARIABLES *********************



// ********************* FUNCTIONS *********************



// ********************* MAIN *********************

fetch('http://localhost:5678/api/works')
.then(response => {
if (response.ok) {
    return response.json(); // Convertir la réponse en JSON
} 
})
.then(data => {
data.forEach(element => {
    createGalleryElement(element);
});
console.log(data);
})

function createGalleryElement(element) {
let gallery    = document.querySelector('.gallery')
let figure     = document.createElement('figure');/Déclare la variable figure qui crée un élément figure/
let img        = document.createElement('img');/Déclare la variable img qui crée un élément img/
let figcaption = document.createElement('figcaption');/Déclare la variable figcaption qui crée un élément figcaption/
img.src        = element.imageUrl;/On dit que img.src = a l'url fournie par l'api/
img.alt        = element.title;/on dit que img.alt = le titre fourni par l'api/
figcaption.textContent = element.title;/on dit que figcaption.textContent = le titre fourni par l'api/

figure.appendChild(img);/Permet d'ajouter le contenue img dans la balise figure/
figure.appendChild(figcaption);/Permet d'ajouter le contenue figcaption dans la balise figure/
gallery.appendChild(figure);/Permet d'ajouter le contenue figure dans la balise gallery/
}

//**filtres */

window.addEventListener("load", function () {
  let loginButton = document.getElementById("login");
  if (sessionStorage.getItem("token")) {
    loginButton.textContent = "logout";
  }
  else {
    loginButton.textContent = "login";
  }
  loginButton.addEventListener("click", function () {
    /Vérifier si un token est présent dans le sessionStorage/
    if (sessionStorage.getItem("token")) {
      /Effacer le token du sessionStorage/
      sessionStorage.removeItem("token");
      loginButton.textContent = "login";

      if (!isPageRefreshed) {
        isPageRefreshed = true;
        location.reload();
      }
    } else {
      window.location.href = "assets/login.html";
    }
  });
})

function createFilters(data) {
  let filters     = document.querySelector('.filters');
  let firstButton = filters.firstElementChild;

  console.log(firstButton);

  let allListItem = document.createElement('li');
  let allButton   = document.createElement('button');
  allButton.textContent = 'Tous';
  filters.insertBefore(allButton, firstButton);
  allButton.addEventListener('click', () => {
    deleteWorks();
    addAllWorks();
  });

  console.log(filters);

  data.forEach(element => {
    let name         = document.createElement('button');
    name.textContent = element.name;
    filters.appendChild(name);

    console.log(filters);

    name.addEventListener('click', () => {
      deleteWorks();
      addWorks(element.name);
    });
  });
}

async function getWorks() {
  return fetch('http://localhost:5678/api/works')
    .then(response => {/renvoie toute la réponse de l'API/
      return response.json()
    })
}

fetch('http://localhost:5678/api/categories')
  .then(response => {
    return response.json();
  })
  .then(data => {

    let gallery     = document.querySelector('.gallery');
    let firstButton = gallery.firstElementChild;
    if (sessionStorage.getItem("token") == null) {
      createFilters(data);
    }
  });

function addAllWorks() {
  getWorks().then(data => {
    data.forEach(element => {
      createGalleryElement(element);
    });
  })
}

function deleteWorks() {
  let gallery = document.querySelector('.gallery')
  let figure  = gallery.querySelectorAll('figure')
  figure.forEach(element => {
    gallery.removeChild(element);
  })
}

function addWorks(name) {
  getWorks().then(data => {
    data.forEach(element => {
      if (element.category.name == name) {
        createGalleryElement(element);
      }
    })
  })
}
