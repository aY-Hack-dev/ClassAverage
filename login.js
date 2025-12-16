document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  const nom=document.getElementById("nom").value.trim();
  const prenom=document.getElementById("prenom").value.trim();
  const sexe=document.querySelector('input[name="sexe"]:checked')?.value;
  if(!nom || !prenom || !sexe){ alert("Veuillez remplir tous les champs."); return; }
  localStorage.setItem("user", JSON.stringify({nom,prenom,sexe,date:new Date().toISOString()}));
  window.location.href="page.html";
});
