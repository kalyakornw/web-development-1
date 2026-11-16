
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
    const weatherAPIKey = "4:33:19 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
4:33:19 PM: Netlify Build                                                 
4:33:19 PM: ────────────────────────────────────────────────────────────────
4:33:19 PM: ​
4:33:19 PM: ❯ Version
4:33:19 PM:   @netlify/build 37.7.6
4:33:19 PM: ​
4:33:19 PM: ❯ Flags
4:33:19 PM:   accountId: 6a9e92051570809a66711ec9
4:33:19 PM:   baseRelDir: true
4:33:19 PM:   buildId: 6afb1422426725dfdee5fdae
4:33:19 PM:   deployId: 6afb1422426725dfdee5fdb0
4:33:19 PM:   serverDistDir: /tmp/server-6afb1422426725dfdee5fdb0
4:33:19 PM: ​
4:33:19 PM: ❯ Current directory
4:33:19 PM:   /opt/build/repo
4:33:19 PM: ​
4:33:19 PM: ❯ Config file
4:33:19 PM:   No config file was defined: using default values.
4:33:19 PM: ​
4:33:19 PM: ❯ Context
4:33:19 PM:   production
4:33:19 PM: ​
4:33:19 PM: Functions bundling                                            
4:33:19 PM: ────────────────────────────────────────────────────────────────
4:33:19 PM: ​
4:33:19 PM: Packaging Functions from Project2a_WeatherExplorer/netlify/functions directory:
4:33:19 PM:  - weather.js
4:33:19 PM: ​
4:33:19 PM: ​
4:33:19 PM: (Functions bundling completed in 132ms)
4:33:19 PM: ​
4:33:19 PM: Scanning for secrets in code and build output.                
4:33:19 PM: ────────────────────────────────────────────────────────────────
4:33:19 PM: ​
4:33:19 PM: ​
4:33:19 PM: ❯ Scanning complete. 43 file(s) scanned. Secrets scanning found 1 instance(s) of secrets in build output or repo code.
4:33:19 PM: ​
4:33:19 PM: Secret env var "OPENWEATHER_API_KEY"'s value detected:
4:33:19 PM:   found value at line 171 in WS07_AJAX/ws7.js
4:33:19 PM: ​
4:33:19 PM: To prevent exposing secrets, the build will fail until these secret values are not found in build output or repo files.
4:33:19 PM: ​
4:33:19 PM: If these are expected, use SECRETS_SCAN_OMIT_PATHS, SECRETS_SCAN_OMIT_KEYS, or SECRETS_SCAN_ENABLED to prevent detecting.
4:33:19 PM: ​
4:33:19 PM: For more information on secrets scanning, see the Netlify Docs: https://ntl.fyi/configure-secrets-scanning
4:33:19 PM: ​
4:33:19 PM: Secrets scanning detected secrets in files during build.      
4:33:19 PM: ────────────────────────────────────────────────────────────────
4:33:19 PM: ​
4:33:19 PM:   Error message
4:33:19 PM:   Secrets scanning found secrets in build.
4:33:19 PM: ​
4:33:19 PM:   Resolved config
4:33:19 PM:   build:
4:33:19 PM:     environment:
4:33:19 PM:       - OPENWEATHER_API_KEY
4:33:19 PM:     publish: /opt/build/repo/Project2a_WeatherExplorer
4:33:19 PM:     publishOrigin: ui
4:33:19 PM:   functionsDirectory: /opt/build/repo/Project2a_WeatherExplorer/netlify/functions
4:33:19 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
4:33:19 PM: Failing build: Failed to build site
4:33:20 PM: Finished processing build request in 5.96s
Deploying
Skipped
Cleanup
Skipped";

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
