// Exercise 1 – Console

console.log("Hello World!");
alert("Hello World!");


// Exercise 2 – Variables

const name = "Kalyakorn";
let age = 33;
const favouriteAnimal = " My Cat";

console.log(name);
console.log(age);
console.log(favouriteAnimal);

console.log(
    "Hello! My name is " + name + " and my favourite animal is the " + favouriteAnimal + "."
);

// Exercise 3 – User Input

const visitorName = prompt("What is your name?");

console.log("Hello " + visitorName + "! Welcome to JavaScript.");

// Exercise 4 – Conditionals

const userAge = prompt("How old are you?");

if (userAge >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are under 18.");
}

// Exercise 5 – Functions

function greetUser(name) {
    console.log("Hello " + name + "!");
}

greetUser("Kalyakorn");
greetUser("Ari");
greetUser("Aava");

// Exercise 6 – Button

const button = document.getElementById("myButton");

button.addEventListener("click", function() {
    alert("JavaScript works!");
});