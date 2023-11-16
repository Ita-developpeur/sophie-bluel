'use strict';

// ********************* FUNCTIONS *********************

/**
 * Retrieves works from the API.
 */
async function getWorks() {
  return fetch('http://localhost:5678/api/works')
    .then(response => {
      return response.json()
    })
}

/**
 * Fetches the works data and displays them in the gallery.
 */
async function displayWorks() {
  const works = await getWorks();
  works.forEach(work => {
    createGalleryElement(work);
});
}

/**
 * Retrieves categories from the API and performs certain actions based on the response.
 */
async function getCategories() {
  fetch('http://localhost:5678/api/categories')
  .then(response => {
    return response.json();
  })
  .then(data => {

    let gallery     = document.querySelector('.gallery');
    if (localStorage.getItem("token") === null) {
      createFilters(data);
    }
  });
}

/**
 * Creates a gallery element for the given element.
 */
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

/**
 * Adds all works to the gallery.
 */
function addAllWorks() {
  getWorks().then(data => {
    data.forEach(element => {
      createGalleryElement(element);
    });
  })
}

/**
 * Deletes all the figure elements from the gallery.
 */
function deleteWorks() {
  let gallery = document.querySelector('.gallery')
  let figure  = gallery.querySelectorAll('figure')
  figure.forEach(element => {
    gallery.removeChild(element);
  })
}

/**
 * Retrieves works from the server and creates gallery elements for works that match the given category name.
 */
function addWorks(name) {
  getWorks().then(data => {
    data.forEach(element => {
      if (element.category.name === name) {
        createGalleryElement(element);
      }
    })
  })
}

/**
 * Creates filters based on the given data.
 */
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

/**
 * Logs the user out and updates the login button text accordingly.
 */
function logout() {
  let loginButton = document.getElementById("login");
  let editor = document.getElementById("edit");
  let modify = document.getElementById("modify");

  console.log(localStorage.getItem("token"));

  if (localStorage.getItem("token")) {
    loginButton.textContent = "logout";
    editor.style.display = "flex";
    modify.style.display = "flex";
  }
  else {
    loginButton.textContent = "login";
    editor.style.display = "none";
    modify.style.display = "none";
  }
  loginButton.addEventListener("click", function () {
    /Vérifier si un token est présent dans le localStorage/
    if (localStorage.getItem("token")) {
      /Effacer le token du localStorage/
      localStorage.removeItem("token");
      loginButton.textContent = "login";
      window.location.href = "index.html";
    } else {
      window.location.href = "assets/login.html";
    }
  });
}

// ********************* MAIN *********************

displayWorks();
getCategories();
window.addEventListener("load", logout);
