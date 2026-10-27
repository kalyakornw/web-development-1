
// =============================================
// WORKSHOP 7: PARSING JSON/XML WITH AJAX
// =============================================

document.addEventListener("DOMContentLoaded", function () {

    // Find HTML elements
    const buttons = document.querySelectorAll("button");
    const jsondata = document.getElementById("jsondata");
    const rawdata = document.getElementById("rawdata");
    const weatherdata = document.getElementById("weatherdata");
    const citySelect = document.getElementById("city");
    const citySearch = document.getElementById("citysearch");
    const searchButton = document.getElementById("search");

    // =============================================
    // EXERCISE 1: JSON BASICS
    // =============================================

    const text = '{ "employees" : [' +
        '{ "firstName":"John", "lastName":"Doe" },' +
        '{ "firstName":"Anna", "lastName":"Smith" },' +
        '{ "firstName":"Peter", "lastName":"Jones" } ]}';

    const employees = JSON.parse(text);

    // Show first and last names
    buttons[0].addEventListener("click", function () {
        jsondata.innerHTML = "<h3>Employee Names</h3>";

        const list = document.createElement("ul");

        employees.employees.forEach(function (person) {
            const item = document.createElement("li");
            item.textContent =
                person.firstName + " " + person.lastName;
            list.appendChild(item);
        });

        jsondata.appendChild(list);
    });

    // Show all details
    buttons[1].addEventListener("click", function () {
        jsondata.innerHTML = "<h3>All Employee Details</h3>";

        const list = document.createElement("ul");

        employees.employees.forEach(function (person) {
            const item = document.createElement("li");
            item.textContent =
                "First name: " + person.firstName +
                " | Last name: " + person.lastName;
            list.appendChild(item);
        });

        jsondata.appendChild(list);
    });


    // =============================================
    // EXERCISE 2: FETCH JSON FROM OMDb API
    // =============================================

    const omdbURL =
        "https://www.omdbapi.com/?s=star+wars&apikey=cbbc6750";

    // Load raw response
    buttons[2].addEventListener("click", async function () {
        rawdata.textContent = "Loading raw data...";

        try {
            const response = await fetch(omdbURL);

            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.text();
            rawdata.textContent = data;

        } catch (error) {
            rawdata.textContent =
                "Error loading raw data: " + error.message;
            console.error(error);
        }
    });

    // Load and parse movie data
    buttons[3].addEventListener("click", async function () {
        rawdata.textContent = "Loading movie data...";

        try {
            const response = await fetch(omdbURL);

            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.json();

            if (data.Response === "False") {
                throw new Error(data.Error || "No movies found.");
            }

            const movies = data.Search || [];
            const heading = document.createElement("h3");
            heading.textContent = "Star Wars Movies";

            const table = document.createElement("table");
            table.className = "movie-table";

            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            ["Poster", "Title", "Year", "Type", "IMDb ID"]
                .forEach(function (headingText) {
                    const th = document.createElement("th");
                    th.textContent = headingText;
                    headerRow.appendChild(th);
                });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement("tbody");

            movies.forEach(function (movie) {
                const row = document.createElement("tr");
                const posterCell = document.createElement("td");

                if (movie.Poster && movie.Poster !== "N/A") {
                    const image = document.createElement("img");
                    image.src = movie.Poster;
                    image.alt = movie.Title + " poster";
                    image.width = 70;
                    posterCell.appendChild(image);
                } else {
                    posterCell.textContent = "No poster";
                }

                row.appendChild(posterCell);

                ["Title", "Year", "Type", "imdbID"]
                    .forEach(function (property) {
                        const cell = document.createElement("td");
                        cell.textContent = movie[property] || "N/A";
                        row.appendChild(cell);
                    });

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            rawdata.replaceChildren(heading, table);

        } catch (error) {
            rawdata.textContent =
                "Error loading movies: " + error.message;
            console.error(error);
        }
    });


    // =============================================
    // EXERCISE 3: OPENWEATHERMAP API
    // =============================================

    // Your API key from this conversation
    const weatherAPIKey = "3dea59f692a6075c73962afb5fd32401";

    async function getWeather(cityName) {
        weatherdata.textContent =
            "Loading weather for " + cityName + "...";

        const url =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            encodeURIComponent(cityName) +
            "&units=metric&appid=" +
            encodeURIComponent(weatherAPIKey);

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Weather request failed."
                );
            }

            const heading = document.createElement("h3");
            heading.textContent =
                "Weather in " + data.name + ", " + data.sys.country;

            const details = document.createElement("ul");

            const weatherItems = [
                "Temperature: " + data.main.temp + " °C",
                "Cloud cover: " + data.clouds.all + "%",
                "Humidity: " + data.main.humidity + "%",
                "Conditions: " + data.weather[0].description
            ];

            weatherItems.forEach(function (description) {
                const item = document.createElement("li");
                item.textContent = description;
                details.appendChild(item);
            });

            weatherdata.replaceChildren(heading, details);

            console.log("Raw weather data:", data);

        } catch (error) {
            weatherdata.textContent =
                "Error loading weather: " + error.message;
            console.error(error);
        }
    }

    // Fetch weather for Helsinki
    buttons[4].addEventListener("click", function () {
        getWeather("Helsinki");
    });

    // Update weather when the dropdown changes
    citySelect.addEventListener("change", function () {
        getWeather(citySelect.value);
    });

    // Search for a city
    searchButton.addEventListener("click", function () {
        const cityName = citySearch.value.trim();

        if (cityName === "") {
            weatherdata.textContent = "Please enter a city name.";
            return;
        }

        getWeather(cityName);
    });

    // Allow searching by pressing Enter
    citySearch.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchButton.click();
        }
    });

});
