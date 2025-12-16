// Vérifie si l'utilisateur existe déjà dans le localStorage
const savedUser = JSON.parse(localStorage.getItem("user"));

if (savedUser) {
  // Redirige directement vers la page principale si déjà connecté
  window.location.href = "page.html";
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const sexe = document.querySelector('input[name="sexe"]:checked')?.value;

  if (!nom || !prenom || !sexe) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  // Sauvegarde de l'utilisateur dans localStorage
  const user = { nom, prenom, sexe, date: new Date().toISOString() };
  localStorage.setItem("user", JSON.stringify(user));

  // Redirection vers la page principale
  window.location.href = "page.html";
});