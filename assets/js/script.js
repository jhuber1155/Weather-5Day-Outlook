var cityName = document.getElementById("cityNameSearch")
var currentCityDay = document.getElementById("chosen-city-day")
var citySearchButton = document.getElementById("citySearchButton")
var forecastEl = document.getElementById("forecast")



function getCityApi() {

    var submitCityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName.value + "&limit=1&appid=9161499c0d3f90ae93e65e2d44573b8e"
    
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
        // for (var i = 0; i < deg5data.length; i++)
        //     console.log(deg5data);

        //     var list = deg5data.list
        var fiveDayForecast = {
          date: "",
          icon: "",
          temp: "",
          wind: "",
          humidity: ""
      };
          console.log(data)
        for (var i = 5; i < data.list.length; i += 8){
          fiveDayForecast.date = data.list[i].dt_txt
          fiveDayForecast.icon = data.list[i].weather
          fiveDayForecast.temp = data.list[i].main.temp
          fiveDayForecast.wind = data.list[i].wind.speed
          fiveDayForecast.humidity = data.list[i].main.humidity
      
      
          var cardElement = document.createElement("div")
          cardElement.setAttribute("class", "card col-2")
          var cardBody = document.createElement("div")
          cardBody.setAttribute("class", "card-body")
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
    function previousCities(){
      var previousCities = JSON.parse(localStorage.getItem("previousCityNames"));
      if (previousCities !==null){ 
          cityName = previousCities;
      };
      function renderCities() {
        for (var i = 0; i < previousCities.length; i++) {
            var cityNames = previousCities[i];
    
            var li = document.createElement("li");
            li.textContent = cityNames;
            li.setAttribute("data-index", i);
            cityName.appendChild(li);
        };
    };
      function storeCities(){
        localStorage.setItem("previousCityNames", JSON.stringify(cityName));
    };

    };
});
};
// getCityApi();

citySearchButton.addEventListener("click", function (event){
  event.preventDefault();
  getCityApi(cityName);
  previousCities();
  storeCities();

  
});
