function showTable() {
    const animal = "Lion";
    const habitat = "Savanna";
    const diet = "Carnivore";

    const table = `
        <table>
            <tr>
                <th>Animal</th>
                <th>Habitat</th>
                <th>Diet</th>
            </tr>
            <tr>
                <td>${animal}</td>
                <td>${habitat}</td>
                <td>${diet}</td>
            </tr>
        </table>
    `;

    const container = document.querySelector("#tableContainer");
    container.innerHTML = table;
}


// Exercise 2

const exercise2Heading = document.querySelector("h2:nth-of-type(2)");

exercise2Heading.addEventListener("mouseover", function() {
    console.log("Stepped over me with a mouse!");
});

const exercise1Heading = document.querySelector("h2");

exercise1Heading.addEventListener("click", function() {
    exercise1Heading.style.color = "red";
    exercise1Heading.innerHTML = "Bye bye mouse!";
});


// Exercise 3

const feedback = document.querySelector("#feedback");
const status = document.querySelector("#status");
const charcount = document.querySelector("#charcount");
const preview = document.querySelector("#preview");


// Focus event
feedback.addEventListener("focus", function() {
    status.innerHTML = "You are typing your feedback.";
    feedback.style.backgroundColor = "#ffffcc";
});


// Blur event
feedback.addEventListener("blur", function() {
    status.innerHTML = "";
    feedback.style.backgroundColor = "";
});


// Input event
feedback.addEventListener("input", function() {
    const charLength = feedback.value.length;

    charcount.innerHTML = `${charLength}/200`;

    preview.innerHTML = feedback.value;
});

// Exercise 4

const feedbackForm = document.querySelector("#feedbackForm");

feedbackForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const feedbackText = feedback.value.trim();

    if (feedbackText.length < 10 || feedbackText.length > 200) {
        status.innerHTML = "Feedback must be between 10 and 200 characters.";
        return;
    }

    feedback.value = "";
    charcount.innerHTML = "0/200";
    preview.innerHTML = "(The preview will appear here)";
    status.innerHTML = "Thank you for your feedback!";
});

// Exercise 5

const keybox = document.querySelector("#keybox");
const keyinfo = document.querySelector("#keyinfo");

document.addEventListener("keydown", function(event) {
    console.log(event);

    keyinfo.innerHTML = `Key: ${event.key} | Code: ${event.code}`;

    keybox.innerHTML = event.key;
});