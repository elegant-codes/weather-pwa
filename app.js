const api = {
  key: "63cb3aa628575f82bc08f0fcace60731",
  base: "https://api.openweathermap.org/data/2.5/",
  img: "http://openweathermap.org/img/wn/"
}

const searchBox= document.querySelector('.search-box');
searchBox.addEventListener('keypress', buildQuery);

function buildQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(searchCity) {
  fetch(`${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`)
  .then(weather => {
    return weather.json();
  }).then(showResults)
}

function showResults(weather) {
  console.log(weather);
  let city = document.querySelector('.location .city')
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let icon = document.querySelector('.weather-icon');
  icon.innerHTML= `<img src="${api.img}/${weather.weather[0].icon}@2x.png" />`;
  

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let desc = document.querySelector('.current .desc');
  desc.innerText = weather.weather[0].main;

  let wind = document.querySelector('.wind .deg');
  wind.innerText= `${weather.wind.speed.toFixed(1)}km/h`;

  let humidity = document.querySelector('.humidity .deg');
  humidity.innerText= `${weather.main.humidity}%`;

  let maxTemp = document.querySelector('.max-temp .deg');
  maxTemp.innerText = `${Math.round(weather.main.temp_max)}°C`;

}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}












