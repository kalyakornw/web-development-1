// WS05 student starter / opiskelijan aloituspohja
// Complete the TODOs. This file is intentionally unfinished.
// Täydennä TODO-kohdat. Tämä tiedosto on tarkoituksella keskeneräinen.

const animalForm = document.getElementById("animalForm");
const animalName = document.getElementById("animalName");
const animalSpecies = document.getElementById("animalSpecies");
const careNote = document.getElementById("careNote");
const nameError = document.getElementById("nameError");
const speciesError = document.getElementById("speciesError");
const noteError = document.getElementById("noteError");
const formResult = document.getElementById("formResult");

// Exercises 1 and 3 / Harjoitukset 1 ja 3
animalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
nameError.textContent = "";
speciesError.textContent = "";
noteError.textContent = "";
formResult.textContent = "";

const name = animalName.value.trim();
const species = animalSpecies.value.trim();
const note = careNote.value.trim();

let isValid = true;

if (name === "") {
    nameError.textContent = "Please enter the animal's name.";
    isValid = false;
}

if (species === "") {
    speciesError.textContent = "Please enter the animal's species.";
    isValid = false;
}

if (note.length > 150) {
    noteError.textContent = "Care note must be 150 characters or fewer.";
    isValid = false;
}

if (!isValid) {
    return;
}

const animal = {
    name: name,
    species: species,
    note: note
};

formResult.textContent =
    `Animal: ${name} (${species}). Care note: ${note}`;

localStorage.setItem("ws05Animal", JSON.stringify(animal));

});

// Exercise 2 / Harjoitus 2
const sponsorForm = document.getElementById("sponsorForm");
const animalType = document.getElementById("animalType");
const yearsInput = document.getElementById("years");
const cost = document.getElementById("cost");
const discountMessage = document.getElementById("discountMessage");

sponsorForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
const years = Number(yearsInput.value);
const selectedAnimal = animalType.value;

// Annual sponsorship fees

const annualFee = Number(animalType.value);


if (!Number.isInteger(years) || years < 1 || !annualFee) {
    cost.textContent = "Please enter valid sponsorship details.";
    discountMessage.textContent = "";
    return;
}

// Calculate the total before discounts
let total = annualFee * years;
let message = "";

// 20% discount for more than 2 years
if (years > 2) {
    total = total * 0.8;
    message = "20% discount applied.";
}

// Extra €5 discount for 5 or more years
if (years >= 5) {
    total = total - 5;
    message += " Extra €5 discount applied.";
}

// Display the final price
cost.textContent = `€${total.toFixed(2)}`;
discountMessage.textContent = message;

});

// Exercise 4 / Harjoitus 4
const loadButton = document.getElementById("loadAnimal");
const clearButton = document.getElementById("clearAnimal");
const savedAnimal = document.getElementById("savedAnimal");


function loadAnimal() {
    const storedAnimal = localStorage.getItem("ws05Animal");

    if (storedAnimal === null) {
        savedAnimal.textContent = "No saved animal found.";
        return;
    }

    const animal = JSON.parse(storedAnimal);

    savedAnimal.textContent =
        `Name: ${animal.name}, Species: ${animal.species}, Care note: ${animal.note}`;
}


loadButton.addEventListener("click", loadAnimal);
clearButton.addEventListener("click", function () {
    
    localStorage.removeItem("ws05Animal");
    savedAnimal.textContent = "Saved animal cleared.";

});

loadAnimal();
