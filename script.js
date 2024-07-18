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
      displayCards(cards);
    })
    .catch((error) => console.error("Unable to fetch data:", error));
});