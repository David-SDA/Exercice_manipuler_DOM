function shuffleChildren(parent){
    let children = parent.children;
    let i = children.length, k, temp;
    while(--i > 0){
        k = Math.floor(Math.random() * (i+1));
        temp = children[k];
        children[k] = children[i];
        parent.appendChild(temp);
    }
}

function showReaction(type, clickedBox){
    clickedBox.classList.add(type);
    if(type !== "success"){
        setTimeout(function(){
            clickedBox.classList.remove(type);
        }, 800)
    }
}

/* Fonction pour démarrer le timer */
function demarrerTimer(){
    secondes++;
    timer.innerHTML = secondes;
}

const box = document.createElement("div");
box.classList.add("box");

const board = document.querySelector("#board");

let nb = 1;

/* On récupère le timer */
let timer = document.getElementById('timer');
let secondes = 0;

/* On récupère le boutton */
let bouton = document.getElementById('bouton');

let nombre = prompt("Combien de cases ?");
while(isNaN(nombre)){
    alert("Ce n'est pas un nombre");
    nombre = prompt("Combien de cases ?");
}
while(nombre < 0){
    alert("Il faut un nombre supérieur à 0 !");
    nombre = prompt("Combien de cases ?");
}

for(let i = 1; i <= nombre; i++){
    let newbox = box.cloneNode();
    newbox.innerText = i;
    board.appendChild(newbox);

    newbox.addEventListener("click", function(){
        if(i == nb){
            newbox.classList.add("box-clicked");
            if(nb == board.children.length){
                board.querySelectorAll(".box").forEach(function(box){
                    showReaction("success", box);
                })
            }
            nb++;
        }
        else if(i > nb){
            showReaction("error", newbox);
            nb = 1;
            secondes = -1;
            board.querySelectorAll(".box-clicked").forEach(function(validBox){
                validBox.classList.remove("box-clicked");
            })
            shuffleChildren(board);
        }
        else{
            showReaction("notice", newbox);
        }
    })
}

shuffleChildren(board);

/* Quand la page est chargée, on démarre le timer */
window.addEventListener('load', function(){
    setInterval(demarrerTimer, 1000);
});

bouton.addEventListener('click', function(){
    nb = 1;
    secondes = -1;
    board.querySelectorAll(".box-clicked").forEach(function(validBox){
        validBox.classList.remove("box-clicked");
    })
    shuffleChildren(board);
})