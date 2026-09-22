// EXAMPLE 1 ANIMAL TABLE

const animalButton = document.querySelector("#animalButton");
const animalTable = document.querySelector("#animalTable");

animalButton.addEventListener("click", function () {
    animalTable.hidden = !animalTable.hidden;
    console.log("Button Pressed");
});


// EXAMPLE 3 LISTEN DROPDOWN SELECT

const animalSelect = document.querySelector("#animalSelect");
const animalName = document.querySelector("#animalName");
const animalImage = document.querySelector("#animalImage");
const animalDescription = document.querySelector("#animalDescription");

animalSelect.addEventListener("change", function () {
    const selectedAnimal = animalSelect.value;

    console.log("Selected animal:", selectedAnimal);

    if (selectedAnimal === "tiger") {
        animalName.textContent = "Tiger";
        animalImage.src = "images/tiger.png";
        animalImage.alt = "Tiger";
        animalDescription.textContent =
            "Tigers are the largest members of the cat family.";
    }
    if (selectedAnimal === "elephant") {
    animalName.textContent = "Elephant";
    animalImage.src = "images/elephant.png";
    animalImage.alt = "Elephant";
    animalDescription.textContent =
        "Elephants are the world's largest land animals.";
}
    if (selectedAnimal === "penguin") {
    animalName.textContent = "Penguin";
    animalImage.src = "images/penguin.png";
    animalImage.alt = "Penguin";
    animalDescription.textContent =
        "Penguins are flightless birds that live mostly in the Southern Hemisphere.";
}

    if (selectedAnimal === "panda") {
    animalName.textContent = "Panda";
    animalImage.src = "images/panda.png";
    animalImage.alt = "Panda";
    animalDescription.textContent =
        "Pandas are bears that mainly eat bamboo.";
}

animalImage.addEventListener("mouseenter", function () {
    animalImage.classList.add("image-highlight");
});
animalImage.addEventListener("mouseleave", function () {
    animalImage.classList.remove("image-highlight");
});
});


// TASK 1

const changeHeadingButton = document.querySelector("#changeHeadingButton");
const taskOneHeading = document.querySelector("#taskOneHeading");

changeHeadingButton.addEventListener("click", function () {
    taskOneHeading.textContent = "Updated heading!";
});


const changeStyleButton = document.querySelector("#changeStyleButton");

changeStyleButton.addEventListener("click", function () {
    taskOneHeading.classList.toggle("highlight");
});


const changeTextButton = document.querySelector("#changeTextButton");
const animalText = document.querySelector("#animalText");

changeTextButton.addEventListener("click", function () {
    animalText.textContent =
        "Tigers are powerful and fascinating animals.";
});

// TASK 2

const animalContent = document.querySelector("#animalContent");
const animalHeading = document.createElement("h3");

animalHeading.textContent = "Animal of the Day";
animalHeading.classList.add("animal-heading");

animalContent.appendChild(animalHeading);

const animalParagraph = document.createElement("p");

animalParagraph.textContent =
    "Tigers are powerful animals that live in different parts of Asia.";

const animalDayImage = document.createElement("img");

animalDayImage.src = "images/tiger.png";
animalDayImage.alt = "Tiger";

animalContent.append(animalParagraph);
animalContent.append(animalDayImage);

const hideAnimalButton = document.querySelector("#hideAnimalButton");

hideAnimalButton.addEventListener("click", function () {
    animalContent.hidden = true;
});

const showAnimalButton = document.querySelector("#showAnimalButton");

showAnimalButton.addEventListener("click", function () {
    animalContent.hidden = false;
});

// TASK 4

const animalForm = document.querySelector("#animalForm");

animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const animal = document.querySelector("#observationAnimal").value;
    const location = document.querySelector("#observationLocation").value;
    const date = document.querySelector("#observationDate").value;

    if (animal === "" || location === "" || date === "") {
        alert("Please fill in all fields.");
        return;
    }

    const newRow = document.createElement("tr");

    const animalCell = document.createElement("td");
    animalCell.textContent = animal;

    const locationCell = document.createElement("td");
    locationCell.textContent = location;

    const dateCell = document.createElement("td");
    dateCell.textContent = date;

    newRow.append(animalCell);
    newRow.append(locationCell);
    newRow.append(dateCell);

    const observationTableBody =
        document.querySelector("#observationTableBody");

    observationTableBody.append(newRow);
});

// BONUS 1

const moveAnimalButton = document.querySelector("#moveAnimalButton");

moveAnimalButton.addEventListener("click", function () {
    animalImage.style.transform = "translateX(100px)";
});