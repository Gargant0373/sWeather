import { useState } from "react";
import { WeatherData, fetchWeather } from "./Api";
import "./App.css";

function App() {

    const [city, setCity] = useState<string>("");
    const [data, setData] = useState<WeatherData | null>(null);

    const validateCity = async () => {
        if (city === "") return alert("Please enter a city name");
        if (!city.match("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$")) return alert("Please enter a valid city name");

        let res = await fetchWeather(city);
        if (res === null) {
            alert("City not found");
            return;
        }

        setData(res);
    }

    return (
        <>
            <div className="app">
                <img src="weather.png" alt="weather icon" width="100px" height="100px" />
                <form className="wform">
                    <input className="winput" type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                    <button className="wbutton" type="submit" onClick={(e) => {
                        e.preventDefault();
                        validateCity();
                    }}>Search</button>
                </form>
                {data !== null && (
                    <div className="wdata">
                        <a className="title">{data.location}</a>
                        <div className="grid">
                            <a className="temp">{data.temp} °C</a>
                            <img className="wicon" src={`http://openweathermap.org/img/w/${data.icon}.png`} alt="weather icon" />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
