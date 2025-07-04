let city = "Colombo";
let timeZoneId;
let updatedCity = "";

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("search-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      setCity();
    });
});

function setCity() {
  const input = document.getElementById("city-input").value.trim();
  if (input) {
    city = input;
    fetchWeather();
    document.getElementById("city-input").value = "";
  } else {
    alert("Please enter a valid city name.");
  }
}

function setBackground(hour, conditionText) {
  let bg = "";
  const isCloudy =
    conditionText.toLowerCase().includes("cloud") ||
    conditionText.toLowerCase().includes("rain") ||
    conditionText.toLowerCase().includes("drizzle") ||
    conditionText.toLowerCase().includes("fog") ||
    conditionText.toLowerCase().includes("mist");

  if (isCloudy) {
    if (hour >= 5 && hour < 9) bg = "assets/rainy-morning.jpg";
    else if (hour >= 9 && hour < 11) bg = "assets/rainy-later-morning.jpg";
    else if (hour >= 11 && hour < 14) bg = "assets/rainy-afternoon.jpg";
    else if (hour >= 14 && hour < 16) bg = "assets/rainy-afternoon.jpg";
    else if (hour >= 16 && hour < 18) bg = "assets/rainy-evening.jpg";
    else if (hour >= 18 && hour < 20) bg = "assets/early-night-rainy.jpg";
    else bg = "assets/rainy-midnight.jpg";
  } else {
    if (hour >= 5 && hour < 9) bg = "assets/sunny-morning.jpg";
    else if (hour >= 9 && hour < 11) bg = "assets/sunny-later-morning.jpg";
    else if (hour >= 11 && hour < 14) bg = "assets/sunny-afternoon.jpg";
    else if (hour >= 14 && hour < 16) bg = "assets/sunny-afternoon.jpg";
    else if (hour >= 16 && hour < 18) bg = "assets/sunny-evening.jpg";
    else if (hour >= 18 && hour < 20) bg = "assets/early-night.jpg";
    else bg = "assets/midnight.jpg";
  }
  document.getElementById("body").style.backgroundImage = `url('${bg}')`;
}

function updateCityClock(){

const parts = new Intl.DateTimeFormat('en-US', {
  timeZone: timeZoneId,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
}).formatToParts(new Date());



  let hh, mm, ss;
for (const part of parts) {
  if (part.type === "hour") hh = part.value;
  if (part.type === "minute") mm = part.value;
  if (part.type === "second") ss = part.value;
}

  document.getElementById("clock-city").textContent = updatedCity || "City";
  document.getElementById("city-live-time").textContent = `${hh}:${mm}:${ss}`;

}

function updateClock() {
  let currentDateTime = new Date();
  const hh = String(currentDateTime.getHours()).padStart(2, "0");
  const mm = String(currentDateTime.getMinutes()).padStart(2, "0");
  const ss = String(currentDateTime.getSeconds()).padStart(2, "0");

  document.getElementById("live-time").textContent = `${hh}:${mm}:${ss}`;
}

function updateWeatherUI(data) {
  const loc = data.location;
  const cur = data.current;

  document.getElementById("city").innerHTML = loc.name;
  document.getElementById(
    "region-country"
  ).innerHTML = `${loc.region}, ${loc.country}`;
  document.getElementById("temperature").innerHTML = `${cur.temp_c} °C`;
  document.getElementById("condition-text").innerHTML = cur.condition.text;
  document.getElementById("condition-icon").src = `https:${cur.condition.icon}`;
  document.getElementById(
    "last-updated"
  ).innerHTML = `Last updated: ${cur.last_updated}`;
  document.getElementById("feelslike").innerHTML = `${cur.feelslike_c} °C`;
  document.getElementById("wind").innerHTML = `${cur.wind_kph} km/h`;
  document.getElementById("humidity").innerHTML = `${cur.humidity}%`;
  document.getElementById("pressure").innerHTML = `${cur.pressure_mb} mb`;
  document.getElementById("precip").innerHTML = `${cur.precip_mm} mm`;
  document.getElementById("visibility").innerHTML = `${cur.vis_km} km`;
  document.getElementById("cloud").innerHTML = `${cur.cloud}%`;
  document.getElementById("uvindex").innerHTML = `${cur.uv}`;

  const localHour = new Date(loc.localtime).getHours();
 timeZoneId = loc.tz_id;
  updatedCity = loc.name;
  setBackground(localHour, cur.condition.text);
}

function fetchWeather() {
  document.getElementById("loading-spinner").style.display = "block";
  document.getElementById("weather-content").style.display = "none";

  fetch(`api/weather?city=${city}`)
    .then((response) => {
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      updateWeatherUI(data);
      document.getElementById("loading-spinner").style.display = "none";
      document.getElementById("weather-content").style.display = "block";
    })
    .catch((err) => {console.error("Error fetching weather data:", err);
      document.getElementById("loading-spinner").style.display = "none";
      alert("Failed to load weather data.");
      city = "Colombo";
      fetchWeather();
    });
}

fetchWeather();
setInterval(updateClock, 1000);
setInterval(updateCityClock, 1000);
setInterval(fetchWeather, 600000);
