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

// Déclarer une variable pour sélectionner nav
let nav = document.querySelector("nav");

// Déclarer une fonction pour afficher le Nav
function displayNav() {
  // Créer un tableau avec les onglets et leurs liens
  let menu = [
    {
      title: "Homepage",
      url: "#",
    },
    {
      title: "Mes derniers projets",
      url: "#latest-projects",
    },
    {
      title: "A propos de moi",
      url: "#about",
    },
    {
      title: "Contact",
      url: "#contact",
    },
  ];

  // Utiliser la méthode for pour parcourir le tableau menu
  for (let i = 0; i < menu.length; i++) {
    let liMenu = document.createElement("li");

    // Créer un lien
    let link = document.createElement("a");
    link.href = menu[i].url;
    link.textContent = menu[i].title;

    liMenu.appendChild(link);
    nav.appendChild(liMenu).style.listStyleType = "none";
    link.setAttribute("class", "ms-3 me-3 text-light text-decoration-none");

    // Créer une variable et ajouter une condition pour la version Mobile First
    let isMobileHeader = window.innerWidth <= 767;
    if (isMobileHeader) {
      // Récupérer l'élément parent pour le rendre vide : cela permettra de modifier le contenu à l'intérieur et éviter la répétition
      let headerIconBurgerDisplay = document.querySelector("nav");
      headerIconBurgerDisplay.innerHTML = "";
      // Les onglets ne s'affichent pas
      liMenu.style.display = "none";

      // Importer une icône de Font Awesome
      let iconMenu = document.createElement("i");
      iconMenu.setAttribute("class", "fa fa-bars fa-2x");
      iconMenu.setAttribute("aria-hidden", "true");
      headerIconBurgerDisplay.appendChild(iconMenu);

      // Créer une variable pour afficher les onglets en version Mobile First
      let displayMenuMobileFirst = null;
      // Créer une condition lorsque l'icône Menu Burger est cliqué
      iconMenu.addEventListener("click", function () {
        if (!displayMenuMobileFirst) {
          displayMenuMobileFirst = document.createElement("div");
          displayMenuMobileFirst.setAttribute(
            "class",
            "display-menu-mobile-first container d-flex justify-content-center align-items-center"
          );
          displayMenuMobileFirst.style.position = "fixed";
          displayMenuMobileFirst.style.top = "0px";
          displayMenuMobileFirst.style.backgroundImage =
            "url('assets/img/Background_V1.png')";
          displayMenuMobileFirst.style.backgroundSize = "cover";
          displayMenuMobileFirst.style.height = "700px";
          displayMenuMobileFirst.style.width = "100%";
          displayMenuMobileFirst.style.backgroundRepeat = "no-repeat";
          displayMenuMobileFirst.style.backgroundPosition = "center";
          document.body.appendChild(displayMenuMobileFirst);

          // Afficher les onglets en version mobile first
          let ulMenuMobileFirst = document.createElement("ul");
          ulMenuMobileFirst.setAttribute("class", "p-0 m-0 text-center");

          for (let i = 0; i < menu.length; i++) {
            let liMenuMobileFirst = document.createElement("li");
            liMenuMobileFirst.setAttribute("class", "mt-1 mb-1");

            // Créer des liens pour chaque onglet
            let link = document.createElement("a");
            link.href = menu[i].url;
            link.textContent = menu[i].title;

            displayMenuMobileFirst.appendChild(ulMenuMobileFirst);
            ulMenuMobileFirst.appendChild(liMenuMobileFirst);
            liMenuMobileFirst.appendChild(link);

            liMenuMobileFirst.style.listStyleType = "none";
            link.setAttribute("class", "text-light text-decoration-none");

            // Créer un gestionnaire d'évènement lorsqu'un onglet est cliqué, celui-ci amène à une ancre et l'affichage s'enlève
            link.addEventListener("click", function () {
              displayMenuMobileFirst.remove();
            });
          }
        } else {
          displayMenuMobileFirst.remove();
          displayMenuMobileFirst = null;
        }
      });
    }
  }
}
displayNav();

// Déclarer une fonction pour afficher les cards "Mes derniers projets"
function displayCards(cards) {
  // Parcourir les données dans le fichier JSON
  cards.forEach((card) => {
    // Affichage des cards
    let cardDisplay = document.createElement("div");
    document.getElementsByClassName("card-display")[0].appendChild(cardDisplay);
    cardDisplay.setAttribute("class", "col-lg-6 col-sm-12 mb-3");

    let pictureCard = new Image();
    pictureCard.src = card.picture;
    pictureCard.style.maxWidth = "100%";
    pictureCard.style.maxHeight = "100%";
    pictureCard.style.marginLeft = "auto";
    pictureCard.style.marginRight = "auto";
    pictureCard.style.display = "block";

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

    // Afficher les données dans le fichier HTML
    cardDisplay.appendChild(pictureCard);
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

// Déclarer une fonction permettant d'ouvrir un nouvel onglet lorsqu'on clique sur une icône
function displayIcons() {
  // Créer une balise div contenant le bloc des icônes
  let displayIcons = document.createElement("div");
  displayIcons.setAttribute("class", "icons-grp");
  document
    .getElementsByClassName("icons-container")[0]
    .appendChild(displayIcons);

  // Créer un Array avec img src (path) et a href (url)
  let icons = [
    {
      url: "https://github.com/OceaneLao",
      path: "assets/img/mdi_github.png",
    },
    {
      url: "https://www.linkedin.com/in/laooceane/",
      path: "assets/img/mdi_linkedin.png",
    },
    {
      url: "https://www.behance.net/laooceane",
      path: "assets/img/devicon-plain_behance.png",
    },
  ];

  // Sélectionner le div icons-grp
  let iconsDisplay = document.getElementsByClassName("icons-grp")[0];
  // Utiliser la méthode forEach pour parcourir le tableau
  icons.forEach((icon) => {
    // Créer les images des icônes
    let displayIcons = document.createElement("img");
    displayIcons.src = icon.path;
    displayIcons.style.maxWidth = "15%";
    displayIcons.style.maxHeight = "15%";
    displayIcons.setAttribute("class", "ms-3 me-3");

    // Créer les liens a href
    let linksIcons = document.createElement("a");
    linksIcons.href = icon.url;
    linksIcons.appendChild(displayIcons);
    iconsDisplay.appendChild(linksIcons);

    // Ajouter un gestionnaire d'évènement lorsqu'une icône est cliquée dessus vers un nouvel onglet
    linksIcons.addEventListener("click", function (event) {
      event.preventDefault(); // Empêcher le lien de s'ouvrir normalement
      window.open(icon.url, "_blank"); // Ouvrir le lien dans un nouvel onglet
    });
  });
}
displayIcons();

//Formulaire de contact
function sendEmail(){
  Email.send({
    Host : "smtp-relay.brevo.com",
    Username : "oceane.lao1@gmail.com",
    Password : "nKGFU17Larjz23xp",
    To : 'oceane.lao1@gmail.com',
    From : document.getElementById("email").value,
    Subject : "Contact form Portfolio",
    Body : "Name:" + document.getElementById("name").value
    + "<br> Email : " + document.getElementById("email").value
    + "<br> Message : " + document.getElementById("message").value
}).then(
  message => alert("Message envoyé avec succès !")
);
}