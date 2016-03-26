var mutations = 0;
var population = 2;
var birthRate = 2;
var lifeSpan = 100;
var deathRate = 1;
var speciesTime = 0;
var upgradeBirth = 0; var upgradeLifeSpan = 0; var upgradeDeath = 0; 
var costBirth = 500; var costLifeSpan = 600; var costDeath = 700;
var totalSpecies = 1;
var totalMutations = 0;
var totalTime = 0;

function refreshStats(){
    document.getElementById("iron").innerHTML = iron;
    document.getElementById("gold").innerHTML = gold;
    document.getElementById("copper").innerHTML = copper;
    document.getElementById("tin").innerHTML = tin;
    document.getElementById("lithium").innerHTML = lithium;
    document.getElementById("diamond").innerHTML = diamond;
    document.getElementById("energy").innerHTML = energy;
    document.getElementById("money").innerHTML = money;
}

function gainOre(){
    oreType = Math.floor(Math.random() * 100);
    if(oreType >= 96){
        diamond += orePerClick;
    }
    if(oreType < 96 && oreType >= 86){
        gold += orePerClick;
    }
    if(oreType < 86 && oreType >= 71){
        lithium += orePerClick;
    }
    if(oreType < 71 && oreType >= 51){
        iron += orePerClick;
    }
    if(oreType < 51 && oreType >= 31){
        tin += orePerClick;
    }
    if(oreType < 31){
        copper += orePerClick;
    }
    refreshStats();
}

function pulseMine(){
    if(energy > (pulseLevel * 8) && pulseLevel > 0){
        energy = energy - (pulseLevel * 8);
        oreType2 = Math.floor(Math.random() * 100);
        if(oreType2 >= 96){
        diamond += 16;
        }
        if(oreType2 < 96 && oreType2 >= 86){
            gold += 16;
        }
        if(oreType2 < 86 && oreType2 >= 71){
            lithium += 16;
        }
        if(oreType2 < 71 && oreType2 >= 51){
            iron += 16;
        }
        if(oreType2 < 51 && oreType2 >= 31){
        tin += 16;
        }
        if(oreType2 < 31){
            copper += 16;
        }
        refreshStats();
    }
}

function sellAll(){
    ironNum = iron;
    goldNum = gold;
    copperNum = copper;
    tinNum = tin;
    lithiumNum = lithium;
    diamondNum = diamond;
    for (a = 0; a < ironNum; a++){
        iron -= 1;
        money += ironPrice;
    }
    for (b = 0; b < goldNum; b++){
        gold -= 1;
        money += goldPrice;
    }
    for (c = 0; c < copperNum; c++){
        copper -= 1;
        money += copperPrice;
    }
    for (d = 0; d < tinNum; d++){
        tin -= 1;
        money += tinPrice;
    }
    for (e = 0; e < lithiumNum; e++){
        lithium -= 1;
        money += lithiumPrice;
    }
    for (f = 0; f < diamondNum; f++){
        diamond -= 1;
        money += diamondPrice;
    }
    ironNum = 0;
    goldNum = 0;
    copperNum = 0;
    tinNum = 0;
    lithiumNum = 0;
    diamondNum = 0;
    refreshStats();
}
function upgradePick(){
    if(money > pickCost){
        money -= pickCost;
        if(orePerClick > 31){
            orePerClick = orePerClick + 16;
        }
        if(orePerClick < 17){
            orePerClick = orePerClick * 2;
        }
        pickCost *= 2;
        document.getElementById("orePerClick").innerHTML = orePerClick;
        document.getElementById("pickCost").innerHTML = pickCost;
        document.getElementById("money").innerHTML = money;
    }
}

function upgradeGen(){
    if(money > genCost){
        money -= genCost;
        genLevel += 1;
        genCost = Math.floor(genCost * 1.5);
        document.getElementById("genLevel").innerHTML = genLevel;
        document.getElementById("genCost").innerHTML = genCost;
        document.getElementById("money").innerHTML = money;
    }
}

function getEnergy(){
    energy += genLevel * 8;
    energy += gen2Level * 32;
    refreshStats();
}

function winGame(){
    if (money >= 10000000){
        money -= 10000000;
        refreshStats();
        alert("Congratulations! You Have Won The Game!!!");
        alert("You Can Quit Now (HIGHLY Unadvisable), or you can carry on playing!");
    }
}

function updateMutations(){
    var newMutations = birthRate;
    mutations += newMutations;
    totalMutations += newMutations;
}

function updatePopulation(){
    population += birthRate - deathRate;
}

function updateBirthRate(){
    birthRate += population;
}

function updateLifeSpan(){
    lifeSpan = 50;
}

function updateDeathRate(){
    deathRate = population * 0.01;
    deathRate = 0;
}

function updateTime(){
    speciesTime += 1;
    totalTime += 1;
}

function refreshWindow(){
    document.getElementById("show-mutations").innerHTML = mutations;
    document.getElementById("show-population").innerHTML = population;
    document.getElementById("show-rate-birth").innerHTML = birthRate;
    document.getElementById("show-life-span").innerHTML = lifeSpan;
    document.getElementById("show-rate-death").innerHTML = deathRate;
    document.getElementById("show-species-time").innerHTML = speciesTime;
    document.getElementById("show-tot-mutations").innerHTML = totalMutations;
    document.getElementById("show-tot-time").innerHTML = totalTime;
}

function incrementGame(){
    alert('increment')
    updateMutations();
    updatePopulation();
    updateBirthRate();
    updateLifeSpan();
    updateDeathRate();
    updateTime();
    refreshWindow();
}

var clock = 0
function timer(){
    clock += 1
    document.getElementById("show-mutations").innerHTML = clock;
}

window.setInterval(timer(), 1000);
