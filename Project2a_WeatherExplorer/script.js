
/* =========================================
   WEATHER EXPLORER
   Project 2a - AJAX and XML
   ========================================= */

// OpenWeatherMap API key
// Replace YOUR_API_KEY with your key for local testing.
// Do not publish your real API key on GitHub.
const API_KEY = "YOUR_API_KEY";

// Get HTML elements
const weatherData = document.getElementById("weatherdata");
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const citySelect = document.getElementById("citySelect");


/* =========================================
   FUNCTION: FETCH WEATHER DATA
   ========================================= */

function fetchWeather(city) {

    // Check that a city was entered
    if (!city) {
        weatherData.innerHTML = `
            <div class="weather-placeholder">
                <h2>Please enter a city name</h2>
                <p>Enter a destination to discover its weather.</p>
            </div>
        `;
        return;
    }

    // Create an AJAX request
    const xhr = new XMLHttpRequest();

    // Build the OpenWeatherMap API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&mode=xml&appid=${API_KEY}`;

    // Send the request
    xhr.open("GET", url, true);

    // Display loading message
    weatherData.innerHTML = `
        <div class="weather-placeholder">
            <h2>Loading weather...</h2>
            <p>Fetching current weather information.</p>
        </div>
    `;


    /* =========================================
       HANDLE API RESPONSE
       ========================================= */

    xhr.onload = function () {

        // Check whether the request was successful
        if (xhr.status === 200) {

            // Get the XML response
            const xmlData = xhr.responseXML;

            // Extract city information
            const cityElement = xmlData.getElementsByTagName("city")[0];

            const cityName = cityElement.getAttribute("name");

            // Get country code
            const countryCode = cityElement
                .getElementsByTagName("country")[0].textContent;

            // Convert country codes into readable names
            const countryNames = {
                FI: "Finland",
                SE: "Sweden",
                GB: "United Kingdom",
                FR: "France",
                TH: "Thailand",
                IT: "Italy"
            };

            const country = countryNames[countryCode] || countryCode;


            /* =========================================
               EXTRACT TEMPERATURE INFORMATION
               ========================================= */

            const temperatureElement =
                xmlData.getElementsByTagName("temperature")[0];

            const temperature =
                temperatureElement.getAttribute("value");

            const minTemperature =
                temperatureElement.getAttribute("min");

            const maxTemperature =
                temperatureElement.getAttribute("max");


            /* =========================================
               EXTRACT OTHER WEATHER INFORMATION
               ========================================= */

            const humidity =
                xmlData.getElementsByTagName("humidity")[0]
                .getAttribute("value");

            const clouds =
                xmlData.getElementsByTagName("clouds")[0]
                .getAttribute("name");

            const weatherElement =
                xmlData.getElementsByTagName("weather")[0];

            const weather =
                weatherElement.getAttribute("value");

            const weatherIcon =
                weatherElement.getAttribute("icon");

            const windElement =
                xmlData.getElementsByTagName("wind")[0];

            const windSpeed =
                windElement.getElementsByTagName("speed")[0]
                .getAttribute("value");

            const pressure =
                xmlData.getElementsByTagName("pressure")[0]
                .getAttribute("value");


            /* =========================================
               DISPLAY WEATHER DASHBOARD
               ========================================= */

            weatherData.innerHTML = `
                <div class="weather-dashboard">

                    <div class="weather-main">

                        <p class="eyebrow">CURRENT WEATHER</p>

                        <h2>${cityName}</h2>

                        <p class="location-country">${country}</p>

                        <div class="temperature-row">

                            <img
                                src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"
                                alt="${weather}"
                                class="weather-icon"
                            >

                            <h3>${Number(temperature).toFixed(1)}°C</h3>

                        </div>

                        <p class="weather-description">
                            ${weather}
                        </p>

                        <p class="feels-like">
                            Low: ${Number(minTemperature).toFixed(1)}°C
                            &nbsp; | &nbsp;
                            High: ${Number(maxTemperature).toFixed(1)}°C
                        </p>

                    </div>


                    <div class="weather-details">

                        <div class="weather-card">
                            <p>HUMIDITY</p>
                            <h3>${humidity}%</h3>
                        </div>

                        <div class="weather-card">
                            <p>CLOUD CONDITIONS</p>
                            <h3>${clouds}</h3>
                        </div>

                        <div class="weather-card">
                            <p>WIND SPEED</p>
                            <h3>${Number(windSpeed).toFixed(1)} m/s</h3>
                        </div>

                        <div class="weather-card">
                            <p>PRESSURE</p>
                            <h3>${pressure} hPa</h3>
                        </div>

                    </div>

                </div>
            `;

        } else {

            // Display an error if the city cannot be found
            weatherData.innerHTML = `
                <div class="weather-placeholder">
                    <h2>City not found</h2>
                    <p>Please check the spelling and try again.</p>
                </div>
            `;
        }
    };


    /* =========================================
       HANDLE CONNECTION ERRORS
       ========================================= */

    xhr.onerror = function () {

        weatherData.innerHTML = `
            <div class="weather-placeholder">
                <h2>Connection error</h2>
                <p>Unable to retrieve weather information. Please try again.</p>
            </div>
        `;
    };


    // Start the AJAX request
    xhr.send();
}


/* =========================================
   EVENT LISTENERS
   ========================================= */

// Search when the user clicks the Search button
searchButton.addEventListener("click", function () {

    const city = cityInput.value.trim();

    fetchWeather(city);
});


// Search when the user presses Enter
cityInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        const city = cityInput.value.trim();

        fetchWeather(city);
    }
});


// Fetch weather when the user selects a city
citySelect.addEventListener("change", function () {

    const city = citySelect.value;

    if (city) {

        cityInput.value = city;

        fetchWeather(city);
    }
});
