//Tutoriel : https://www.youtube.com/watch?v=dgcYOm8n8ME&ab_channel=CodewithVoran

function sendMail() {
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_rd2fw9q";
  const template = "template_wep46pi";

  emailjs
    .send(serviceID, template, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("Votre message a été envoyé avec succès !");
    })
    .catch((err) => console.log(err));
}