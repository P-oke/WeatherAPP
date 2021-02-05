const api = {
  key: "c7a27beac11dabfcf516c8084d8dad6d",
  url: "https://api.openweathermap.org/data/2.5/",
};
const searchbox = document.querySelector(".search-box");
const error=document.querySelector(".show-error")
searchbox.addEventListener("keypress", (val) => {
  if (val.keyCode === 13) {

    getresults(searchbox.value);
    val.target.value=""
  
  }
});

function getresults(response) {
  fetch(`${api.url}weather?q=${response}&units=metric&appid=${api.key}`)
    .then((data) => {
      return data.json();
    })

    .then(displayresults)

    .catch((err) => {
      console.log(err.message);
    });
   
}
function displayresults(weathervalue) {
  const city = document.querySelector(".city");
  city.innerText = `${weathervalue.name}, ${weathervalue.sys.country}`;

  let current = new Date();
  let date = document.querySelector(".date");
  date.innerText = dateloader(current);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weathervalue.main.temp)}<span>&deg;C</span>`;

  let weathercond = document.querySelector(".weathercond");
  weathercond.innerText = weathervalue.weather[0].main;

  let hilow = document.querySelector(".hi-lw");
  hilow.innerHTML = `${Math.round(
    weathervalue.main.temp_min
  )}<span>&deg;C</span> <span>/</span>${Math.round(
    weathervalue.main.temp_max
  )}<span>&deg;C</span>`;
}

function dateloader(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

