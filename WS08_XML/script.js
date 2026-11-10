
// OpenWeatherMap API key

// OpenWeatherMap API key
const API_KEY = "YOUR_API_KEY";

// Function to fetch weather data
function fetchWeather(city) {
    const weatherData = document.getElementById("weatherdata");

const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&mode=xml&appid=${API_KEY}`;
    // Create XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Send GET request
    xhr.open("GET", url, true);

    // Handle response
    xhr.onload = function () {

        if (xhr.status === 200) {

            // Get XML response
            const xmlData = xhr.responseXML;

            // Extract information from XML
const city = xmlData.getElementsByTagName("city")[0];
const temperature = xmlData.getElementsByTagName("temperature")[0];
const humidity = xmlData.getElementsByTagName("humidity")[0];
const clouds = xmlData.getElementsByTagName("clouds")[0];
const weather = xmlData.getElementsByTagName("weather")[0];

// Get values from XML attributes
const cityName = city.getAttribute("name");
const tempValue = temperature.getAttribute("value");
const humidityValue = humidity.getAttribute("value");
const cloudValue = clouds.getAttribute("value");
const weatherDescription = weather.getAttribute("value");


// Display results on the webpage


weatherData.innerHTML = `
    <h2>Weather in ${cityName}</h2>
    <p>Temperature: ${tempValue} °C</p>
    <p>Humidity: ${humidityValue}%</p>
    <p>Cloudiness: ${cloudValue}%</p>
    <p>Weather: ${weatherDescription}</p>
`;


       } else {
    weatherData.textContent =
        "City not found or unable to retrieve weather data. Please try again.";
}
    };
xhr.onerror = function () {
    weatherData.textContent =
        "Network error. Please check your internet connection.";
};
    // Send request
    xhr.send();
}

// Call the function

// Fetch weather when clicking the dropdown button
document.getElementById("fetchWeather")
    .addEventListener("click", function () {

        const selectedCity = document.getElementById("city").value;

        fetchWeather(selectedCity);
    });

// Search weather by city name
document.getElementById("search")
    .addEventListener("click", function () {

        const searchCity = document.getElementById("citysearch").value.trim();

        if (searchCity !== "") {

            fetchWeather(searchCity);

        } else {

            document.getElementById("weatherdata").textContent =
                "Please enter a city name.";

        }
    });
