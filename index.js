const searchBtn = document.getElementById("search-btn");
const recentSearches = document.getElementById("recent-searches");
const APIkey = "1ca1a82fc99c6fa9c9cf0d400c675270";
const cityHistory = document.getElementById("recentSearches");
let recentCities = [];

function getCity (city) {

  var geoQuery = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIkey}`;
  fetch(geoQuery)
    .then((res) => res.json())
    .then((jsonData) => {
      console.log(jsonData);
      var lat = jsonData[0].lat;
      var lon = jsonData[0].lon;

      var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;
      fetch(weatherURL)
        .then((weatherData) => weatherData.json())
        .then((jsonWeather) => getWeather(jsonWeather))
    });

    //city name and information HTML elements
  let cityName = document.getElementById("city-name");
  let cityDate = document.getElementById("city-date");
  let cityTemp = document.getElementById("city-temp");
  let cityWind = document.getElementById("city-wind");
  let cityHumidity = document.getElementById("city-humidity");

    //following five days html elements 
  let nextDay = document.getElementById("next-day").children;
  let secondDay = document.getElementById("second-day").children;
  let thirdDay = document.getElementById("third-day").children;
  let fourthDay = document.getElementById("fourth-day").children;
  let fifthDay = document.getElementById("fifth-day").children;

  function getWeather(cityWeather) {
    //date data extrated from JSON
    console.log(cityWeather);
    let dateAndTime = cityWeather.list[0].dt_txt;
    let stringDateAndTime = String(dateAndTime);
    let splitDateAndTime = stringDateAndTime.split(" ");
    let date = splitDateAndTime[0];

    let nextDateAndTime = cityWeather.list[6].dt_txt;
    let nextStringDateAndTime = String(nextDateAndTime);
    let nextSplitDateAndTime = nextStringDateAndTime.split(" ");
    let nextDate = nextSplitDateAndTime[0];

    let secondDateAndTime = cityWeather.list[14].dt_txt;
    let secondStringDateAndTime = String(secondDateAndTime);
    let secondSplitDateAndTime = secondStringDateAndTime.split(" ");
    let secondDate = secondSplitDateAndTime[0];

    let thirdDateAndTime = cityWeather.list[22].dt_txt;
    let thirdStringDateAndTime = String(thirdDateAndTime);
    let thirdSplitDateAndTime = thirdStringDateAndTime.split(" ");
    let thirdDate = thirdSplitDateAndTime[0];

    let fourthDateAndTime = cityWeather.list[30].dt_txt;
    let fourthStringDateAndTime = String(fourthDateAndTime);
    let fourthSplitDateAndTime = fourthStringDateAndTime.split(" ");
    let fourthDate = fourthSplitDateAndTime[0];

    let fifthDateAndTime = cityWeather.list[38].dt_txt;
    let fifthStringDateAndTime = String(fifthDateAndTime);
    let fifthSplitDateAndTime = fifthStringDateAndTime.split(" ");
    let fifthDate = fifthSplitDateAndTime[0];

    //city name value set to city variable
    cityName.innerHTML = city;
    if (recentCities.includes(city)===false) {
      recentCities.push(city);
    localStorage.setItem("recentCities", JSON.stringify(recentCities))
    displayHistory();
    }
    

    cityDate.innerHTML = date;
    cityTemp.innerHTML = cityWeather.list[0].main.temp;
    cityWind.innerHTML = cityWeather.list[0].wind.speed;
    cityHumidity.innerHTML = cityWeather.list[0].main.humidity;

    //following days date and temperature values assigned to corresponding html elemtns
    nextDay[0].innerHTML = nextDate;
    nextDay[1].innerHTML = cityWeather.list[6].main.temp;
    nextDay[2].innerHTML = cityWeather.list[6].wind.speed;
    nextDay[3].innerHTML = cityWeather.list[6].main.humidity;

    secondDay[0].innerHTML = secondDate;
    secondDay[1].innerHTML = cityWeather.list[14].main.temp;
    secondDay[2].innerHTML = cityWeather.list[14].wind.speed;
    secondDay[3].innerHTML = cityWeather.list[14].main.humidity;

    thirdDay[0].innerHTML = thirdDate;
    thirdDay[1].innerHTML = cityWeather.list[22].main.temp;
    thirdDay[2].innerHTML = cityWeather.list[22].wind.speed;
    thirdDay[3].innerHTML = cityWeather.list[22].main.humidity;

    fourthDay[0].innerHTML = fourthDate;
    fourthDay[1].innerHTML = cityWeather.list[30].main.temp;
    fourthDay[2].innerHTML = cityWeather.list[30].wind.speed;
    fourthDay[3].innerHTML = cityWeather.list[30].main.humidity;

    fifthDay[0].innerHTML = fifthDate;
    fifthDay[1].innerHTML = cityWeather.list[38].main.temp;
    fifthDay[2].innerHTML = cityWeather.list[38].wind.speed;
    fifthDay[3].innerHTML = cityWeather.list[38].main.humidity;
  }
}

function displayHistory () {
  const recentCityData = JSON.parse(localStorage.getItem("recentCities"))
  if(recentCityData) {
    recentCities = recentCityData
    cityHistory.innerHTML=""
    for (let i=0; i < recentCities.length; i++) {
      const button = document.createElement("button")
      button.textContent=recentCities[i]
      button.classList.add("buttonHistory")
      cityHistory.appendChild(button)
    }
    const buttonHistory = document.querySelectorAll(".buttonHistory")
    for (let i=0; i < buttonHistory.length; i++) {
      buttonHistory[i].addEventListener("click", function () {
      const city = this.textContent
      getCity(city)
      })
    }
  }
}

displayHistory();
// //const nextDay = document.getElementById("myDIV").children
// let count = document.getElementById("next-day").children;
// function countChildren() {
//   console.log(count);
// }

// countChildren();

searchBtn.addEventListener("click", function () {
  var city = document.getElementById("search-input").value;
  getCity(city)
});
