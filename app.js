const iconele = document.querySelector('.weaicon');
const locicon = document.querySelector('.locicon');
const tempele = document.querySelector('.dets p');
const desc = document.querySelector('.desc p');
const locele = document.querySelector('.loc p');
const notiele = document.querySelector('.noti');

var inp = document.getElementById('search');
let city = "";
let lati = 0.0;
let longi = 0.0;

inp.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    city = inp.value;
    getSearchWeather(city);
    console.log(city);
  }
});

const wea = {};
wea.temp = {
  unit: 'celsius',
};

const KELVIN = 273;
const key = 'bc3d31751e980cc81f6660c01c6b87e9';

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notiele.style.display = 'block';
  notiele.innerHTML = `<p>Browser doesn't support geolocation</p>`;
}

function setPosition(p) {
  lati = p.coords.latitude;
  longi = p.coords.longitude;

  getWeather(lati, longi);
}

locicon.addEventListener("click", function (e) {
  console.log("ey");
  getWeather(lati, longi);
});

function showError(e) {
  notiele.style.display = 'block';
  notiele.innerHTML = `<p>${e.message}</p>`;
}

function getSearchWeather(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    fetch(api)
      .then(function (res) {
        let data = res.json();
        return data;
      })
      .then(function (data) {
        wea.temp.value = Math.floor(data.main.temp - KELVIN);
        wea.desc = data.weather[0].description;
        wea.iconId = data.weather[0].icon;
        wea.city = data.name;
        wea.country = data.sys.country;
      })
      .then(function () {
        displayWeather();
      });
  }
  
  function getWeather(lati, longi) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${key}`;
    fetch(api)
      .then(function (res) {
        let data = res.json();
        return data;
      })
      .then(function (data) {
        wea.temp.value = Math.floor(data.main.temp - KELVIN);
        wea.desc = data.weather[0].description;
        wea.iconId = data.weather[0].icon;
        wea.city = data.name;
        wea.country = data.sys.country;
      })
      .then(function () {
        displayWeather();
      });
  }

function displayWeather() {
  // iconele.innerHTML=`<img src="icons/${wea.iconId}.png"/>`
  tempele.innerHTML = `${wea.temp.value} * <span>C</span>`;
  desc.innerHTML = wea.desc;
  locele.innerHTML = `${wea.city}, ${wea.country}`;
}
