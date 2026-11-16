# Weather Explorer – A Study of the Sky

## 1. Project Description

Weather Explorer is a web application that allows users to search for current weather conditions in cities around the world.

The application retrieves live weather information from the OpenWeatherMap API and displays it in a clean, responsive dashboard. Users can search for a city by typing its name or selecting a suggested destination from a dropdown menu.

The project was developed as part of Project 2a: AJAX Call to a Live REST API at Laurea University of Applied Sciences.

## 2. Features

- Search for weather information by city name.
- Select a city from a dropdown list.
- Display current temperature in Celsius.
- Display minimum and maximum temperatures.
- Show a weather icon and description.
- Display humidity, cloud conditions, wind speed and atmospheric pressure.
- Handle invalid city searches with an error message.
- Responsive design for desktop and mobile devices.

## 3. Technologies Used

- HTML5 – Website structure.
- CSS3 – Styling and responsive layout.
- JavaScript – Application functionality and event handling.
- XMLHttpRequest (AJAX) – Retrieving live API data.
- XML – Processing the API response.
- OpenWeatherMap API – Current weather information.

No external JavaScript libraries or frameworks were used.

## 4. How It Works

The application sends an asynchronous HTTP request to the OpenWeatherMap Current Weather API using XMLHttpRequest.

The API returns weather information in XML format. JavaScript parses the XML response, extracts the required information and dynamically updates the weather dashboard.

Event listeners are added using `addEventListener()` to handle search button clicks, Enter key presses and dropdown selection.

## 5. AI Usage and Acknowledgement

ChatGPT was used as an AI-assisted learning and development tool during this project.

AI assistance was used for:

- Understanding the OpenWeatherMap API and its XML response structure.
- Planning the website structure and features.
- Receiving explanations and examples of HTML, CSS and JavaScript.
- Developing and improving the AJAX request and XML parsing functionality.
- Identifying and troubleshooting coding errors.
- Receiving suggestions for the visual design and responsive layout.
- Structuring and improving the project documentation.

The AI-generated suggestions and code examples were reviewed, integrated, tested and adapted during development. The student was responsible for the project implementation, testing, decisions and final result.

## 6. Links

- **GitHub Repository:** (https://github.com/kalyakornw/web-development-1/tree/main/Project2a_WeatherExplorer)
- **Live Website:** (https://weather-explorer-kalyakorn.netlify.app/)
- **Presentation Video:** [Add your video link]

## 7. Self-Evaluation

Through this project, I practised working with a live REST API, making AJAX requests and processing XML data using native JavaScript.

I learned how to extract specific information from an API response and dynamically display it on a webpage. I also improved my understanding of event listeners, error handling and responsive web design.

One of the challenges was understanding the XML response structure and identifying the correct attributes to display. Testing the API response helped me solve these issues.

Using AI as a learning assistant also helped me understand some coding , ask to explain step by step in section that I dont understand and want to improve the application. I learned the importance of checking and testing suggested solutions rather than relying on them without understanding.

I am satisfied with the final result because the application provides working city searches, displays live weather information and has a responsive, user-friendly interface.

## 8. Individual Work

This project was developed individually.
