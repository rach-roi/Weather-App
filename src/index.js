//get temperature in current location and display

function displayTempCurrentLocation(response) {
  let currentLocation = response.data.name;
  let country = response.data.sys.country;
  let temp = response.data.main.temp;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temp}`;

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${currentLocation}, ${country}`;
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=d3aa3f4910ac41a0bf73215274652b40`;

  axios.get(apiUrl).then(displayTempCurrentLocation);
}

function getTempCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getTempCurrentLocation);

//Feature 1 - current day and time (real)

function formatDate(dateTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateTime.getDay()];
  let hours = dateTime.getHours();
  let minutes = dateTime.getMinutes();

  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = day.toUpperCase();

  let currentTime = document.querySelector("#current-time");

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentTime.innerHTML = `${hours}:${minutes}`;
}

let currentDateTime = new Date();
formatDate(currentDateTime);

//Feature 2 - change city heading based on search input, and display temperature and new date and time
//?? Change date and time to the location you are searching

function displayTemp(response) {
  let temp = response.data.main.temp;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temp}`;

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  if (response.data.name === "Arrondissement de Lyon") {
    cityName.innerHTML = "Lyon, FR";
  }
}

function changeCityName(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-text-input");

  let city = searchCityInput.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d3aa3f4910ac41a0bf73215274652b40`;
  axios.get(apiUrl).then(displayTemp);
}

let changeCityForm = document.querySelector("#change-city-form");
changeCityForm.addEventListener("submit", changeCityName);
