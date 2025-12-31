"use strict";

// Create Human Object
function Human(data) {
    this.name = data.name || "Human";
    this.weight = Number(data.weight) || 0;
    this.height = (Number(data.feet) || 0) * 12 + (Number(data.inches) || 0);
    this.diet = (data.diet || "").toLowerCase();
    this.image = "images/human.png";
}

let human = null;

// Create Dino Constructor (using function/prototype pattern)
function Dino(data) {
    this.species = data.species;
    this.weight = Number(data.weight);
    this.height = Number(data.height);
    this.diet = (data.diet || "").toLowerCase();
    this.where = data.where;
    this.when = data.when;
    this.fact = data.fact;
    this.image = "images/" + this.species.toLowerCase() + ".png";
}

// Create Dino Objects
let dinoObjects = [];

fetch("dino.json")
    .then((response) => response.json())
    .then((data) => {
        dinoObjects = data.Dinos.map((dino) => new Dino(dino));
    });


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function compareWeight(human) {
    if (!human || !human.weight) {
        return this.species + " weighed around " + this.weight + " lbs.";
    }

    const weightDiff = this.weight - human.weight;

    if (weightDiff > 0) {
        return this.species + " weighs " + weightDiff + " lbs more than " + human.name + ".";
    }

    if (weightDiff < 0) {
        return human.name + " weighs " + Math.abs(weightDiff) + " lbs more than " + this.species + ".";
    }

    return this.species + " and " + human.name + " weigh the same at " + this.weight + " lbs.";
};

    
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function compareHeight(human) {
    if (!human || !human.height) {
        return this.species + " stood about " + this.height + " inches tall.";
    }

    const heightDiff = this.height - human.height;

    if (heightDiff > 0) {
        return this.species + " is " + heightDiff + " inches taller than " + human.name + ".";
    }

    if (heightDiff < 0) {
        return human.name + " is " + Math.abs(heightDiff) + " inches taller than " + this.species + ".";
    }

    return this.species + " and " + human.name + " are the same height at " + this.height + " inches.";
};

    
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function compareDiet(human) {
    if (!human || !human.diet) {
        return this.species + " was a " + this.diet + ".";
    }

    if (this.diet === human.diet) {
        return this.species + " and " + human.name + " share the same diet: " + this.diet + ".";
    }

    return this.species + " was a " + this.diet + ", while " + human.name + " is a " + human.diet + ".";
};

// Create Dino Random Fact
Dino.prototype.randomFact = function randomFact(human) {
    if (this.species === "Pigeon") {
        return this.fact;
    }

    const factOptions = [
        this.fact,
        this.compareWeight(human),
        this.compareHeight(human),
        this.compareDiet(human),
        this.species + " lived in " + this.where + ".",
        this.species + " lived during the " + this.when + ".",
        this.species + " was a " + (this.diet || "mysterious eater") + "."
    ].filter(Boolean);

    const randomIndex = Math.floor(Math.random() * factOptions.length);

    return factOptions[randomIndex];
};


function buildTiles(human) {
    const grid = document.getElementById("grid");
    if (!grid) {
        return;
    }

    const tiles = dinoObjects.slice();
    tiles.splice(4, 0, human);

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < tiles.length; i += 1) {
        const tileData = tiles[i];
        const tile = document.createElement("div");
        tile.className = "grid-item";

        const title = document.createElement("h3");
        title.textContent = tileData.species || tileData.name;

        const image = document.createElement("img");
        image.src = tileData.image;
        image.alt = tileData.species || tileData.name;

        tile.appendChild(title);
        tile.appendChild(image);

        if (tileData.species) {
            const fact = document.createElement("p");
            fact.textContent = tileData.randomFact(human);
            tile.appendChild(fact);
        }

        fragment.appendChild(tile);
    }

    grid.innerHTML = "";
    grid.appendChild(fragment);
}

// On button click, prepare and display infographic
document.getElementById("btn").addEventListener("click", function handleCompare() {
    human = (function createHumanFromForm() {
        const name = document.getElementById("name").value;
        const feet = document.getElementById("feet").value;
        const inches = document.getElementById("inches").value;
        const weight = document.getElementById("weight").value;
        const diet = document.getElementById("diet").value;

        return new Human({
            name: name,
            feet: feet,
            inches: inches,
            weight: weight,
            diet: diet
        });
    })();

    // Add tiles to DOM
    buildTiles(human);

    // Remove form from screen
    const form = document.getElementById("dino-compare");
    if (form) {
        form.style.display = "none";
    }
});
