
export default async (request) => {
    // Allow only GET requests
    if (request.method !== "GET") {
        return new Response("Method not allowed", {
            status: 405
        });
    }

    try {
        // Read the API key from Netlify environment variables
        const apiKey = Netlify.env.get("OPENWEATHER_API_KEY");

        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: "API key is not configured." }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        // Get the city from the request URL
        const requestUrl = new URL(request.url);
        const city = requestUrl.searchParams.get("city");

        if (!city || !city.trim()) {
            return new Response(
                JSON.stringify({ error: "Please provide a city name." }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }

        // Request XML weather data from OpenWeatherMap
        const weatherUrl = new URL(
            "https://api.openweathermap.org/data/2.5/weather"
        );

        weatherUrl.searchParams.set("q", city.trim());
        weatherUrl.searchParams.set("units", "metric");
        weatherUrl.searchParams.set("mode", "xml");
        weatherUrl.searchParams.set("appid", apiKey);

        const response = await fetch(weatherUrl);

        const xml = await response.text();

        // Return the original XML response
        return new Response(xml, {
            status: response.status,
            headers: {
                "Content-Type": "application/xml; charset=utf-8"
            }
        });

    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Unable to retrieve weather data." }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
};
