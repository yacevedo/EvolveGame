var mutations = 0;
var population = 0;
var birthRate = 0;
var lifeSpan = 0;
var deathRate = 0;
var speciesTime = 0;
var levelBirth = 0; var levelLifeSpan = 0; var levelDeath = 0; 
var costBirth = 50; var costLifeSpan = 60; var costDeath = 70;
var totalSpecies = 0;
var totalMutations = 0;
var totalTime = 0;

var nIntervID;

function induceMutation(){
    mutations += 1;
    refreshWindow()
}

function newSpecies(){
    population = 2;
    birthRate = 2;
    lifeSpan = 5;
    deathRate = 0;
    speciesTime = 0;
    //levelBirth = 0; levelLifeSpan = 0; levelDeath = 0; 
    costBirth = 50; costLifeSpan = 60; costDeath = 70;
    totalSpecies += 1;
    refreshWindow();

    nIntervID = window.setInterval(incrementGame, 1000);
}

function upgradeBirthRate(){
    if(mutations >= costBirth){
        mutations -= costBirth;
        levelBirth += 1;
        costBirth = Math.floor(costBirth * 2);
        document.getElementById("level-birth").innerHTML = levelBirth;
        document.getElementById("cost-birth").innerHTML = costBirth;
        document.getElementById("show-mutations").innerHTML = mutations;
    }
}

function upgradeLifeSpan(){
    if(mutations >= costLifeSpan){
        mutations -= costLifeSpan;
        levelLifeSpan += 1;
        costLifeSpan = Math.floor(costLifeSpan * 2);
        document.getElementById("level-life-span").innerHTML = levelLifeSpan;
        document.getElementById("cost-life-span").innerHTML = costLifeSpan;
        document.getElementById("show-mutations").innerHTML = mutations;
    }
}

function upgradeDeathRate(){
    if(mutations >= costDeath){
        mutations -= costDeath;
        levelDeath += 1;
        costDeath = Math.floor(costDeath * 2);
        document.getElementById("level-death").innerHTML = levelDeath;
        document.getElementById("cost-death").innerHTML = costDeath;
        document.getElementById("show-mutations").innerHTML = mutations;
    }
}

function majorEvolution(){
    if (mutations >= 10000000){
        mutations -= 10000000;
        refreshWindow();
        alert("Major evolution achieved.");
    }
}

function updateMutations(){
    var newMutations = birthRate;
    mutations += newMutations;
    totalMutations += newMutations;
    mutations = Math.floor(mutations)
    totalMutations = Math.floor(totalMutations)
}

function updatePopulation(){
    population += birthRate - deathRate;
    population = Math.floor(population)

    if (population <= 1) {
        window.clearInterval(nIntervID)
        clearSpecies();
    }
}

function clearSpecies(){
    population = 0;
    birthRate = 0;
    lifeSpan = 0;
    deathRate = 0;
    refreshWindow();
}

function updateBirthRate(){
    birthRate = population * Math.pow(1.1, levelBirth);
    birthRate = Math.floor(birthRate)
}

function updateLifeSpan(){
    var baseLifeSpan = 5;
    lifeSpan = baseLifeSpan * Math.pow(1.1, levelLifeSpan);
    lifeSpan = Math.floor(lifeSpan)
}

function updateDeathRate(){
    // Death rate starts at 0 and proportionally increases until life span = species time. At this point birth rate = death rate. Then death rate increases until species dies out.
    deathRate = (speciesTime / lifeSpan * birthRate) * Math.pow(0.9, levelDeath) || 0;
    deathRate = Math.floor(deathRate)
    //deathRate = 0;
}

function updateTime(){
    speciesTime += 1;
    totalTime += 1;
}

function refreshWindow(){
    document.getElementById("show-mutations").innerHTML = mutations;
    document.getElementById("show-population").innerHTML = population;
    document.getElementById("show-rate-change").innerHTML = birthRate-deathRate;
    document.getElementById("show-rate-birth").innerHTML = birthRate;
    document.getElementById("show-life-span").innerHTML = lifeSpan;
    document.getElementById("show-rate-death").innerHTML = deathRate;
    document.getElementById("show-species-time").innerHTML = speciesTime;
    document.getElementById("show-tot-species").innerHTML = totalSpecies;
    document.getElementById("show-tot-mutations").innerHTML = totalMutations;
    document.getElementById("show-tot-time").innerHTML = totalTime;
}

function incrementGame(){
    updateMutations();
    updatePopulation();
    updateBirthRate();
    updateLifeSpan();
    updateDeathRate();
    updateTime();
    refreshWindow();
}
