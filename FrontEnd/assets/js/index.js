'use strict';

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
let gallery = document.querySelector('.gallery')
let figure = document.createElement('figure');/Déclare la variable figure qui crée un élément figure/
let img = document.createElement('img');/Déclare la variable img qui crée un élément img/
let figcaption = document.createElement('figcaption');/Déclare la variable figcaption qui crée un élément figcaption/
img.src = element.imageUrl;/On dit que img.src = a l'url fournie par l'api/
img.alt = element.title;/on dit que img.alt = le titre fourni par l'api/
figcaption.textContent = element.title;/on dit que figcaption.textContent = le titre fourni par l'api/

figure.appendChild(img);/Permet d'ajouter le contenue img dans la balise figure/
figure.appendChild(figcaption);/Permet d'ajouter le contenue figcaption dans la balise figure/
gallery.appendChild(figure);/Permet d'ajouter le contenue figure dans la balise gallery/
}

window.addEventListener("load", function () {
  let loginButton = document.getElementById("login");
  let boutonModifier = document.querySelector('.boutonModifier');
  if (sessionStorage.getItem("token")) {
    loginButton.textContent = "logout";
    boutonModifier.style.display = "flex";
  } 
  else {
    loginButton.textContent = "login";
    boutonModifier.style.display = "none";
  }
})
