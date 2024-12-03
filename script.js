function setToLocalStorage() {
  localStorage.setItem("taches", (JSON.stringify(taches)));
  localStorage.setItem("checked", (JSON.stringify(checked)));
}
function genererListe() {
  document.getElementById("taches").innerHTML = "";
    taches.forEach((tache, i) => {
      document.getElementById("taches").innerHTML += `<li id="${i}" onclick="validerTache(${i})">${tache}</li><span onclick="enleverTache(${i})">\u00d7</span>`
      checked.forEach((tacheChecked) => {
        if (tacheChecked == tache) {
          document.getElementById(i).classList.add("checked");
        }
      })
      setToLocalStorage();
    });
  reParametre();
}
function reParametre() {
  if (taches.length == 0) {
    let parametre = document.getElementById("parametre");
    parametre.style.display = "none";
  }
  else {
    parametre.style.display = "flex";
    document.querySelector("#enCours span").textContent = taches.length;
    document.querySelector("#termine span").textContent = checked.length;
  }
  setToLocalStorage();
}
function ajouterListe() {
  const tache = document.getElementById("saisie").value
  if (tache == "") alert("Vous n'avez rien ecris!");
  else {
    if (taches.find(element => element == tache)) alert("Vous avez deja ajouté cette tache!");
    else {
      taches.push(tache);
      document.getElementById("taches").innerHTML = "";
      genererListe();
      document.getElementById("saisie").value = "";
    }
  }
}
function validerTache(index){
  const li = document.getElementById(index);
  if (li.className!="checked") {
    li.classList.add("checked");
    checked.push(taches[index]);
    reParametre();
  } else {
    li.classList.remove("checked");
    checked = checked.filter(element => element != taches[index]);
    reParametre();
  }
}
function enleverTache(index) {
  checked = checked.filter(element => element != taches[index]);
  taches.splice(index, 1);
  genererListe();
}
function toutSupprimer(){
  taches = [];
  checked = [];
  genererListe();
}

if (JSON.parse(localStorage.getItem("taches")))
  taches = JSON.parse(localStorage.getItem("taches"));
else taches = [];
if (JSON.parse(localStorage.getItem("checked")))
  checked = JSON.parse(localStorage.getItem("checked"));
else checked = [];
genererListe();