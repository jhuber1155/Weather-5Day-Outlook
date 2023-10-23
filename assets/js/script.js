var cityName = document.getElementById("cityNameSearch")
var currentCityDay = document.getElementById("chosen-city-day")
var citySearchButton = document.getElementById("citySearchButton")
var forecastEl = document.getElementById("forecast")
var searchedCities = document.getElementById("searched-cities")
var storedCities = document.querySelectorAll(".history")
var cities = [];

function getCityApi(cityName) {

    var submitCityUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=9161499c0d3f90ae93e65e2d44573b8e"
    
    fetch(submitCityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (cityData) {
      for (var i = 0; i < cityData.length; i++)
        console.log(cityData)

       var cityLatData = cityData[0].lat;
       var cityLongData = cityData[0].lon;

       var requestCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLatData + "&lon=" + cityLongData + "&appid=9161499c0d3f90ae93e65e2d44573b8e&units=imperial"

       fetch(requestCurrentUrl)
       .then(function (response) {
        return response.json();
        })
        .then(function (degdata) {
            console.log(degdata)
            var currentCityName = degdata.name
            currentCityDay.textContent = currentCityName

            
            

            var weatherIcon = degdata.weather[0].icon
            var currentWeather = weatherIcon
            console.log(currentWeather)

            var currentWeatherDate = document.createElement("h2")
            currentWeatherDate.setAttribute("class", "card-group")
            var currentCityDate = dayjs().format("M/D/YYYY")
            currentWeatherDate.textContent = currentCityDate
            var currentWeatherIcon = document.createElement("img")
            currentWeatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${currentWeather}.png`);
            var currentWeatherTemp = document.createElement("p")
            currentWeatherTemp.setAttribute("class", "card-group")
            currentWeatherTemp.textContent = ("Temp: " + degdata.main.temp + "\xB0 F")
            var currentWeatherWind = document.createElement("p")
            currentWeatherWind.setAttribute("class", "card-group")
            currentWeatherWind.textContent = ("Wind: " + degdata.wind.speed + " MPH")
            var currentWeatherHumidity = document.createElement("p")
            currentWeatherHumidity.setAttribute("class", "card-group")
            currentWeatherHumidity.textContent = ("Humidity: " + degdata.main.humidity + " %")

            currentCityDay.append(currentWeatherDate, currentWeatherIcon, currentWeatherTemp, currentWeatherWind, currentWeatherHumidity);
        })

      var request5DayUrl= "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatData + "&lon=" + cityLongData + "&appid=9161499c0d3f90ae93e65e2d44573b8e&units=imperial"

      fetch(request5DayUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)

        var fiveDayForecast = {
          date: "",
          icon: "",
          temp: "",
          wind: "",
          humidity: ""
      };
          console.log(data)
          fiveDayForecast.innerHTML='';
          forecastEl.innerHTML = '';
        for (var i = 1; i < data.list.length; i += 8){
          fiveDayForecast.date = data.list[i].dt_txt
          fiveDayForecast.icon = data.list[i].weather
          fiveDayForecast.temp = data.list[i].main.temp
          fiveDayForecast.wind = data.list[i].wind.speed
          fiveDayForecast.humidity = data.list[i].main.humidity
      
      
          var cardElement = document.createElement("div")
          cardElement.setAttribute("class", "card col-2")
          var cardBody = document.createElement("div")
          cardBody.setAttribute("class", "card-body p-3 mb-2 bg-dark text-white")
          cardElement.append(cardBody)
          var cardTitle = document.createElement("h5")
          cardTitle.setAttribute("class", "card-title")
          cardTitle.textContent = dayjs(fiveDayForecast.date).format("M/D/YYYY")
          var cardWeather = document.createElement("img")
          var weatherIcon = data.list[i].weather[0].icon
          cardWeather.setAttribute("src", `https://openweathermap.org/img/wn/${weatherIcon}.png`)
          cardWeather.textContent = fiveDayForecast.icon
          var cardTemp = document.createElement("p")
          cardTemp.setAttribute("class", "card-text")
          cardTemp.textContent = ("Temp: " + fiveDayForecast.temp + "\xB0 F")
          var cardWind = document.createElement("p")
          cardWind.setAttribute("class", "card-text")
          cardWind.textContent = ("Wind: " + fiveDayForecast.wind + " MPH")
          var cardHumidity = document.createElement("p")
          cardHumidity.setAttribute("class", "card-text")
          cardHumidity.textContent = ("Humidity: " + fiveDayForecast.humidity + " %")
          cardBody.append(cardTitle, cardWeather, cardTemp, cardWind, cardHumidity)
          forecastEl.append(cardElement)
      }
    });
    
});
};
function renderPreviousCities(){
  var cities = JSON.parse(localStorage.getItem("cities"))
  if(cities === null){
    cities = [];
  }
  searchedCities.innerHTML='';
  for (var i = 0; i < cities.length; i++){
  var city = cities[i]
  var newButton = document.createElement("button")
  newButton.textContent = city
  newButton.setAttribute("data-city", city)
  newButton.setAttribute("class", "history btn btn-primary mb-3 p-2")
  searchedCities.appendChild(newButton)
  }

}
// getCityApi();
  citySearchButton.addEventListener("click", function (event){
  event.preventDefault();
  var city = cityName.value
  getCityApi(city);
  var cities = JSON.parse(localStorage.getItem("cities"))
  if(cities === null){
    cities = [];
  }
  var city = cityName.value
  cities.push(city)
  localStorage.setItem("cities", JSON.stringify(cities))
  renderPreviousCities();
});

searchedCities.addEventListener("click", function (event){
  event.preventDefault();
  if(event.target.matches("button")){
  var cityButton = event.target.getAttribute("data-city");
  console.log(cityButton)
  getCityApi(cityButton)
  }
})
renderPreviousCities();