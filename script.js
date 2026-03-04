const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const resetBtn = document.getElementById("resetBtn");
const mainWeatherIcon = document.getElementById("mainWeatherIcon")
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const forecastContainer = document.getElementById("forecastContainer");

const API_KEY = "ddff6ee9b05ae21f417f403e9284a274"; 

function changeBackground(weatherCondition) {
  const body = document.body;

  body.className = "min-h-screen bg-gradient-to-r transition-all duration-700";

  if (weatherCondition === "Clear") {
    body.classList.add("from-yellow-300", "to-orange-500");
  } 
  else if (weatherCondition === "Clouds") {
    body.classList.add("from-gray-400", "to-gray-700");
  } 
  else if (weatherCondition === "Rain") {
    body.classList.add("from-blue-500", "to-indigo-700");
  } 
  else if (weatherCondition === "Thunderstorm") {
    body.classList.add("from-indigo-800", "to-black");
  } 
  else {
    body.classList.add("from-blue-400", "to-blue-600");
  }
}

async function getWeather(city) {

  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!weatherResponse.ok) throw new Error("City not found");

  const weatherData = await weatherResponse.json();

  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );

  const forecastData = await forecastResponse.json();

  return { weatherData, forecastData };
}

function animateContainer() {
  const container = document.querySelector(".container");

  container.classList.add("opacity-0", "translate-y-4");

  setTimeout(() => {
    container.classList.remove("opacity-0", "translate-y-4");
  }, 200);
}

searchBtn.addEventListener("click", async () => {

  const city = cityInput.value.trim();
  if (!city) return;

  errorMessage.classList.add("hidden");
  loading.classList.remove("hidden");

  try {
    const { weatherData, forecastData } = await getWeather(city);

    loading.classList.add("hidden");

    cityName.textContent = weatherData.name;
    temperature.textContent = weatherData.main.temp + "°C";
    condition.textContent = weatherData.weather[0].main;
    humidity.textContent = weatherData.main.humidity + "%";
    wind.textContent = weatherData.wind.speed + " km/h";
    const iconCode = weatherData.weather[0].icon;
    mainWeatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    changeBackground(weatherData.weather[0].main);
    renderForecast(forecastData);

  } catch (error) {
    loading.classList.add("hidden");
    errorMessage.textContent = "City not found!";
    errorMessage.classList.remove("hidden");
  }
  animateContainer();
});

cityInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

resetBtn.addEventListener("click", async () => {

  cityInput.value = "";
  errorMessage.classList.add("hidden");

  try {
    const { weatherData, forecastData } = await getWeather("Bhubaneswar");

    cityName.textContent = weatherData.name;
    temperature.textContent = weatherData.main.temp + "°C";
    condition.textContent = weatherData.weather[0].main;
    humidity.textContent = weatherData.main.humidity + "%";
    wind.textContent = weatherData.wind.speed + " km/h";
    const iconCode = weatherData.weather[0].icon;
    mainWeatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    changeBackground(weatherData.weather[0].main);
    renderForecast(forecastData);

  } catch (error) {
    console.error(error);
  }
  animateContainer();
});

function renderForecast(data) {

  forecastContainer.innerHTML = "";

  if (!data || !data.list) {
    console.log("Forecast data missing");
    return;
  }

  const dailyData = data.list.filter((item, index) => index % 8 === 0);

  dailyData.forEach((day, index) => {

    const iconCode = day.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const card = document.createElement("div");

    card.className =
      "bg-white bg-opacity-20 backdrop-blur-md text-white p-4 rounded-xl shadow-md hover:scale-110 hover:shadow-2xl transition-all duration-500 ease-out opacity-0 translate-y-6 flex flex-col items-center";

    card.innerHTML = `
      <p class="font-semibold">
        ${new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}
      </p>
      <img src="${iconUrl}" class="w-16 h-16">
      <p class="capitalize">${day.weather[0].description}</p>
      <p>${Math.round(day.main.temp_max)}° / ${Math.round(day.main.temp_min)}°</p>
    `;

    forecastContainer.appendChild(card);

    setTimeout(() => {
      card.classList.remove("opacity-0", "translate-y-6");
    }, index * 150);

  });
}

window.addEventListener("DOMContentLoaded", () => {
  getWeather("Bhubaneswar").then(({ weatherData, forecastData }) => {
  cityName.textContent = weatherData.name;
  temperature.textContent = weatherData.main.temp + "°C";
  condition.textContent = weatherData.weather[0].main;
  humidity.textContent = weatherData.main.humidity + "%";
  wind.textContent = weatherData.wind.speed + " km/h";

  const iconCode = weatherData.weather[0].icon;
  mainWeatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  mainWeatherIcon.classList.remove("hidden");

  changeBackground(weatherData.weather[0].main);
  renderForecast(forecastData);
});
});