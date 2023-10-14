import axios from "axios";

const API_KEY = "";

interface WeatherData {
    temp: number;
    location: string;
    icon: string;
}

async function fetchWeather(city: string): Promise<WeatherData | null> {
    try {
        const coords = await fetchCoords(city);

        if (coords === null) {
            alert("Coords null");
            return null;
        }

        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`);
        const data = res.data;
        const temp = data.main.temp;
        const location = coords.city;
        const icon = data.weather[0].icon;

        return { temp, location, icon } as WeatherData;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function fetchCoords(city: string): Promise<{ city: string, lat: number, lon: number } | null> {
    try {
        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`);
        const data = res.data[0];
        const lat = data.lat;
        const lon = data.lon;
        const cityName = data.name;

        return { city: cityName, lat, lon };
    } catch (err) {
        console.log(err);
        return null;
    }
}


export { fetchWeather };
export type { WeatherData };
