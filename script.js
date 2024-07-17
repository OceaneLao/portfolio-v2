// Déclarer une fonction reveal pour révéler les éléments lors du défilement
function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  // Utiliser forEach pour sélectionner chaque reveal
  reveals.forEach(element => {
    // Récupèrer la position verticale de l'élément par rapport au haut de la fenêtre
    let revealTop = element.getBoundingClientRect().top;
    // Récupèrer la hauteur de la fenêtre
    let windowHeight = window.innerHeight;
    // Point de révélation : à quelle distance du haut de la fenêtre l'élément doit être révélé
    let revealPoint = 150;

    // Créer une condition qui vérifie si l'élément est dans la zone de révélation
    if (revealTop < windowHeight - revealPoint) {
      // Ajouter la classe "active" pour appliquer les styles de révélation
      element.classList.add("active");
      element.style.position = "relative";
      element.style.transform = "translateY(0px)";
      element.style.opacity = 1;
      element.style.transition = "opacity 0.2s ease";
    } else {
      // Si l'élément n'est pas dans la zone de révélation, retire la classe "active"
      element.classList.remove("active");
      element.style.transform = "translateY(150px)";
      element.style.opacity = 0;
    }
  });
}
// Ajouter d'un écouteur d'événements de défilement à la fenêtre
window.addEventListener("scroll", reveal);
// Appeler la fonction reveal pour révéler les éléments visibles lors du chargement de la page
reveal();

// Déclarer une fonction pour afficher les cards "Mes derniers projets"
function displayCards(cards) {
  // Parcourir les données dans le fichier JSON
  cards.forEach((card) => {
    // Affichage des cards
    let cardDisplay = document.createElement("div");
    document.getElementsByClassName("card-display")[0].appendChild(cardDisplay);
    cardDisplay.setAttribute("class", "col-lg-6 col-sm-12 mb-3");

    let linkPictureCard = document.createElement("a");
    linkPictureCard.href = card.url;
    linkPictureCard.setAttribute("target", "_blank");
    
    let pictureCard = new Image();
    pictureCard.src = card.picture;
    pictureCard.style.maxWidth = "100%";
    pictureCard.style.maxHeight = "100%";
    pictureCard.style.marginLeft = "auto";
    pictureCard.style.marginRight = "auto";
    pictureCard.style.paddingBottom = "15px";
    pictureCard.style.display = "block";
    pictureCard.setAttribute("alt", card.alt);

    let titleCard = document.createElement("h3");
    titleCard.textContent = card.title;

    let dateCard = document.createElement("p");
    dateCard.textContent = card.date;

    let descriptionCard = document.createElement("p");
    descriptionCard.textContent = card.description;

    let linkCard = document.createElement("a");
    linkCard.href = card.url;
    linkCard.textContent = "Voir le site";
    linkCard.style.color = "#fff";
    linkCard.style.textDecoration = "underline";
    linkCard.setAttribute("target", "_blank");

    // Afficher les données dans le fichier HTML
    cardDisplay.appendChild(linkPictureCard);
    linkPictureCard.appendChild(pictureCard);
    cardDisplay.appendChild(titleCard);
    cardDisplay.appendChild(dateCard);
    cardDisplay.appendChild(descriptionCard);
    cardDisplay.appendChild(linkCard);
  });
}

// Fetch du fichier JSON pour n'afficher que les 2 premières données
document.addEventListener("DOMContentLoaded", function () {
  fetch("projects.json")
    .then((res) => res.json())
    .then((cards) => {
      displayCards(cards.slice(0, 2));
    })
    .catch((error) => console.error("Unable to fetch data:", error));
});

// Sélectionner le bouton "En voir plus"
let buttonSeeMore = document.getElementsByClassName("button-see-more")[0];
// Ajouter un gestionnaire d'évènements qui va générer les autres données dans le fichier JSON lorsque le bouton sera cliqué
buttonSeeMore.addEventListener("click", function () {
  fetch("projects.json")
    .then((res) => res.json())
    .then((cards) => {
      displayCards(cards.slice(2));
      // A surveiller si plus de projets + test
      buttonSeeMore.style.display = "none";
    })
    .catch((error) => console.error("Unable to fetch data:", error));
});