document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const sexe = document.getElementById("sexe").value;
  const avatarFile = document.getElementById("avatar").files[0];

  if(!nom || !prenom || !sexe){
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(){
    const user = { nom, prenom, sexe, avatar: reader.result, date: new Date().toISOString() };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "page.html";
  }
  if(avatarFile) reader.readAsDataURL(avatarFile);
  else{
    const user = { nom, prenom, sexe, avatar:null, date: new Date().toISOString() };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "page.html";
  }
});