const matieres=[
  {nom:"Français",coef:5},{nom:"Anglais",coef:4},{nom:"Mathématiques",coef:3},{nom:"Histoire-Géographie",coef:3},
  {nom:"Philosophie",coef:3},{nom:"Éducation civique",coef:2},{nom:"EPS",coef:2},{nom:"SVT",coef:2}
];

const cardsContainer=document.getElementById("cardsContainer");
const user=JSON.parse(localStorage.getItem("user"));

if(!user) window.location.href="login.html";

document.getElementById("userNameHeader").textContent = `Salut, ${user.prenom}`;
document.getElementById("userAvatar").src = user.avatar || "avatar-placeholder.png";

// Génération des cartes
matieres.forEach((m,i)=>{
  const card=document.createElement("div");
  card.className="card";
  card.innerHTML=`
    <h3>${m.nom} (Coef ${m.coef})</h3>
    <input type="number" id="d1-${i}" placeholder="Devoir 1">
    <input type="number" id="d2-${i}" placeholder="Devoir 2">
    <input type="number" id="comp-${i}" placeholder="Composition">
    <p>Moyenne: <span id="moy-${i}">—</span></p>
    <p>Pondéré: <span id="pond-${i}">—</span></p>
  `;
  cardsContainer.appendChild(card);

  // Calcul automatique par matière
  ["d1-"+i,"d2-"+i,"comp-"+i].forEach(id=>{
    document.getElementById(id).addEventListener("input", ()=> {
      const d1 = document.getElementById(`d1-${i}`).value;
      const d2 = document.getElementById(`d2-${i}`).value;
      const comp = document.getElementById(`comp-${i}`).value;
      if(d1 && d2 && comp){
        const moyD=((+d1 + +d2)*0.4)/2;
        const moyC=+comp*0.6;
        const moy=moyD+moyC;
        const p=moy*m.coef;
        document.getElementById(`moy-${i}`).textContent=moy.toFixed(2);
        document.getElementById(`pond-${i}`).textContent=p.toFixed(2);
      } else {
        document.getElementById(`moy-${i}`).textContent="—";
        document.getElementById(`pond-${i}`).textContent="—";
      }
    });
  });
});

// Calcul général uniquement via bouton
document.getElementById("calculerBtn").onclick=()=>{
  let total=0,valide=false;
  matieres.forEach((m,i)=>{
    const p = document.getElementById(`pond-${i}`).textContent;
    if(p && p!=="—"){
      valide=true;
      total += parseFloat(p);
    }
  });
  document.getElementById("moyenneGenerale").textContent = valide ? (total/24).toFixed(2) : "—";
};

// Mode sombre
document.getElementById("toggleTheme").onclick=()=>document.body.classList.toggle("dark");

// Export image
document.getElementById("exportImageBtn").onclick=()=>{
  html2canvas(document.body).then(canvas=>{
    const link=document.createElement("a");
    link.download=`ClassAverage_${user.prenom}_${user.nom}.png`;
    link.href=canvas.toDataURL("image/png");
    link.click();
  });
};

// Export PDF
document.getElementById("exportPDFBtn").onclick=()=>{
  const { jsPDF } = window.jspdf;
  const pdf=new jsPDF('p','pt','a4');
  html2canvas(document.body).then(canvas=>{
    const imgData=canvas.toDataURL('image/png');
    const imgProps=pdf.getImageProperties(imgData);
    const pdfWidth=pdf.internal.pageSize.getWidth();
    const pdfHeight=(imgProps.height*pdfWidth)/imgProps.width;
    pdf.addImage(imgData,'PNG',0,0,pdfWidth,pdfHeight);
    pdf.save(`ClassAverage_${user.prenom}_${user.nom}.pdf`);
  });
};