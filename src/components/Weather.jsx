import React, { useEffect, useRef, useState } from "react";
import { WeatherIcons, allIcons } from "../assets/assets";

const Weather = () => {
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async (cityName) => {
    try {
      setLoading(true);
      const city = cityName || "Dhaka";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon];
      setWeatherData({
        humidity: data.main.humidity,
        windSpe: data.wind.speed,
        temP: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    search("Dhaka");
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-zinc-900">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-zinc-900">
      <div className="w-[350px] bg-[#132440] text-white sm:w-lg p-2 sm:p-8 sm:h-120 rounded-2xl shadow-xl shadow-cyan-500/30">
        <div className="flex justify-between p-5 drop-shadow-xl">
          <input
            ref={inputRef}
            className="w-full border-1 border-gray-400 outline-none px-3 rounded-l-2xl border-e-amber-50"
            type="search"
            placeholder="Enter your location"
          />
          <img
            className="bg-amber-400 px-4 py-3 bg-cover rounded-r-2xl"
            src={WeatherIcons.search}
            alt=""
            onClick={() => search(inputRef.current.value)}
          />
        </div>
        <div className="flex flex-col items-center">
          <img className="w-20 sm:w-30" src={weatherData.icon} alt="" />
          <div className="flex flex-col items-center">
            <p className="font-semibold text-5xl sm:text-6xl">
              {weatherData.temP}
              <span className="text-xl">℃</span>
            </p>
            <p className="text-2xl sm:text-4xl">{weatherData.location}</p>
          </div>
          <div className="flex w-full justify-between p-5 my-2">
            <div className="flex justify-center gap-3">
              <img
                className="mt-2 w-6 h-6"
                src={WeatherIcons.humidity}
                alt=""
              />
              <div>
                <p className="text-xl font-semibold">{weatherData.humidity}</p>
                <span className="text-lg font-light">Humidity</span>
              </div>
            </div>
            <div className="flex justify-center gap-3">
              <img className="mt-2 w-6 h-6" src={WeatherIcons.wind} alt="" />
              <div>
                <p className="text-xl font-semibold">{weatherData.windSpe}</p>
                <span className="text-lg font-light">Wind</span>
              </div>
            </div>
          </div>
        </div>
        <h5 className="text-center text-gray-700 font-bold">CodeKakku</h5>
      </div>
    </div>
  );
};

export default Weather;
