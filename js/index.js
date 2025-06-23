
let city = 'Colombo';



  function setBackground(hour, conditionText) {
      let bg = '';
      const isCloudy = conditionText.toLowerCase().includes("cloud") || conditionText.toLowerCase().includes("rain");

      if (isCloudy) {

      if (hour >= 5 && hour < 9) bg = 'assets/rainy-morning.jpg';
      else if (hour >= 9 && hour < 11) bg = 'assets/rainy-later-morning.jpg';
      else if (hour >= 11 && hour < 14) bg = 'assets/rainy-afternoon.jpg';
      else if (hour >= 14 && hour < 16) bg = 'assets/rainy-afternoon.jpg';
      else if (hour >= 16 && hour < 18) bg = 'assets/rainy-evening.jpg';
      else if (hour >= 18 && hour < 20) bg = 'assets/early-night-rainy.jpg';
      else bg = 'assets/rainy-midnight.jpg';
      }
      else {
      if (hour >= 5 && hour < 9) bg = 'assets/sunny-morning.jpg';
      else if (hour >= 9 && hour < 11) bg = 'assets/sunny-later-morning.jpg';
      else if (hour >= 11 && hour < 14) bg = 'assets/sunny-afternoon.jpg';
      else if (hour >= 14 && hour < 16) bg = 'assets/sunny-afternoon.jpg';
      else if (hour >= 16 && hour < 18) bg = 'assets/sunny-evening.jpg';
      else if (hour >= 18 && hour < 20) bg = 'assets/early-night.jpg';
      else bg = 'assets/midnight.jpg';
      }
      document.getElementById('body').style.backgroundImage = `url('${bg}')`;

    }


function updateClock() {

  let currentDateTime = new Date();
  const hh = String(currentDateTime.getHours()).padStart(2, '0');
  const mm = String(currentDateTime.getMinutes()).padStart(2, '0');
  const ss = String(currentDateTime.getSeconds()).padStart(2, '0');

  document.getElementById("live-time").textContent = `${hh}:${mm}:${ss}`;
}

function updateWeatherUI(data) {
  const loc = data.location;
  const cur = data.current;

  document.getElementById("city").innerHTML = loc.name;
  document.getElementById("region-country").innerHTML = `${loc.region}, ${loc.country}`;
  document.getElementById("temperature").innerHTML = `${cur.temp_c} °C`;
  document.getElementById("condition-text").innerHTML = cur.condition.text;
  document.getElementById("condition-icon").src = `https:${cur.condition.icon}`;
  document.getElementById("last-updated").innerHTML = `Last updated: ${cur.last_updated}`;
  document.getElementById("feelslike").innerHTML = `${cur.feelslike_c} °C`;
  document.getElementById("wind").innerHTML = `${cur.wind_kph} km/h`;
  document.getElementById("humidity").innerHTML = `${cur.humidity}%`;
  document.getElementById("pressure").innerHTML = `${cur.pressure_mb} mb`;
  document.getElementById("precip").innerHTML = `${cur.precip_mm} mm`;
  document.getElementById("visibility").innerHTML = `${cur.vis_km} km`;
  document.getElementById("cloud").innerHTML = `${cur.cloud}%`;
  document.getElementById("dewpoint").innerHTML = `${cur.dewpoint_c} °C`;

  const localHour = new Date(loc.localtime).getHours();
  setBackground(localHour, cur.condition.text);
}

function fetchWeather() {
  fetch(`api/weather?city=${city}`)
    .then(response => {
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      return response.json();
    })
    .then(data => updateWeatherUI(data))
    .catch(err => console.error('Error fetching weather data:', err));
}


fetchWeather();
setInterval(updateClock, 1000);
setInterval(fetchWeather, 600000);

