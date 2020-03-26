let tableBody = document.getElementById('table-body');
let cards = document.getElementById("cards");

let mostPowerCard = document.getElementsByClassName('most-power-card')

let mostAttack = {damage: ""};
let mostArmor = {armor: ""};
let mostPlayed = {played: ""};
let mostVictory = {victory: ""};
let r = {power: ""};

let myRequest = new Request('https://arfp.eu/dataset/cards.json');
fetch(myRequest)
    .then(reponse => reponse.json())
    .then(data => {
        Object.keys(data).forEach(function(k){
            let newTr = document.createElement('tr');
            tableBody.appendChild(newTr);
            for(let val in data[k]){
                let value = (data[k][val] == null) ? document.createTextNode("") : document.createTextNode(data[k][val]);
                addElemt(newTr, 'td', "employee-" + val, value);
            }

            if(data[k].damage > mostAttack.damage){
                mostAttack = data[k];             
            }

            if(data[k].armor > mostArmor.armor){
                mostArmor = data[k];              
            }

            if(data[k].played > mostPlayed.played){
                mostPlayed = data[k];              
            }

            if(data[k].victory > mostVictory.victory){
                mostVictory = data[k];              
            }

        });
        addCard("Most Attack", mostAttack);
        addCard("Most Armor", mostArmor);
        addCard("Most Played", mostPlayed);
        addCard("Most Victory", mostVictory);
    });

function addElemt(parentElemt, typeElemt, className, value){    
    let elemt = document.createElement(typeElemt);
    parentElemt.appendChild(elemt);
    elemt.className = className;
    if(value != ""){
        elemt.appendChild(value);
    }
    return elemt;
}

function addCard(title, data){
    let card = addElemt(cards, 'div', "card", "");

    addElemt(card, 'h1', "title-card", document.createTextNode(title));

    let headerCard = addElemt(card, 'div', 'header-card', "");

    addElemt(headerCard, 'p', "id-card", document.createTextNode(data.id));

    addElemt(headerCard, 'p', "name-card", document.createTextNode(data.name));

    let playedCard = addElemt(headerCard, 'div', "played-card", "");

    addElemt(playedCard, 'p', "number-played-card",  document.createTextNode("Played: " + data.played));

    let victoryCard = addElemt(headerCard, 'div', "victory-card", "");

    addElemt(victoryCard, 'p', "number-played-card", document.createTextNode("Victory: " + data.victory));

    let imgCard = addElemt(card, 'img', "img-card", "");
    imgCard.src = "./images/knight.png";

    let statsCard = addElemt(card, 'div', "stats-card", "");

    let powerCard = addElemt(statsCard, 'div', "power-card", "");

    addElemt(powerCard, 'p', "label-power-card", document.createTextNode("Power"));

    addElemt(powerCard, 'p', "number-power-card", document.createTextNode(data.power));

    let attackCard = addElemt(statsCard, 'div', "attack-card", "");

    addElemt(attackCard, 'p', "label-attack-card", document.createTextNode("Attack"));

    addElemt(attackCard, 'p', "number-attack-card", document.createTextNode(data.attack));

    let armorCard = addElemt(statsCard, 'div', "armor-card", "");

    addElemt(armorCard, 'p', "label-armor-card", document.createTextNode("Armor"));

    addElemt(armorCard, 'p', "number-armor-card", document.createTextNode(data.armor));
}

