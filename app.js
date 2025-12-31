"use strict";

// Create Dino Constructor (using function/prototype pattern)
function Dino(data) {
    this.species = data.species;
    this.weight = Number(data.weight);
    this.height = Number(data.height);
    this.diet = (data.diet || "").toLowerCase();
    this.where = data.where;
    this.when = data.when;
    this.fact = data.fact;
    this.image = "images/" + this.species.toLowerCase().replace(/\s+/g, "-") + ".png";
}


    // Create Dino Objects


    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
