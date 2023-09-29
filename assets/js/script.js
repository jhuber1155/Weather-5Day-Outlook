// var cityName = document.getElementById("cityNameSearch")
var currentCityDay = document.getElementById("chosen-city-day")
var cityDayOneDate = document.getElementById("day-one")
var cityDayOne = document.getElementById("card-text-one")
var cityDayTwoDate = document.getElementById("card-title-two")
var cityDayTwo = document.getElementById("card-text-two")
var cityDayThreeDate = document.getElementById("card-title-three")
var cityDayThree = document.getElementById("card-text-three")
var cityDayFourDate = document.getElementById("card-title-four")
var cityDayFour = document.getElementById("card-text-four")
var cityDayFiveDate = document.getElementById("card-title-five")
var cityDayFive = document.getElementById("card-text-five")


// var cityName = "Boston"
// " + cityName + "

function getCityApi() {
    var submitCityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=Boston&limit=1&appid=9161499c0d3f90ae93e65e2d44573b8e"
    
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

            var weatherIcon = degdata.weather

            for (var i = 0; i < weatherIcon.length; i++)
            var currentWeatherIcon = weatherIcon[0].icon
            console.log(currentWeatherIcon)


            var currentWeatherAdd = document.createElement("h5")
            currentWeatherAdd.textContent = currentWeatherIcon

            currentCityDay.append(currentWeatherAdd);
        })

      var request5DayUrl= "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatData + "&lon=" + cityLongData + "&appid=9161499c0d3f90ae93e65e2d44573b8e&units=imperial"

      fetch(request5DayUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (deg5data) {
        console.log(deg5data)
        for (var i = 0; i < deg5data.length; i++)
          console.log(deg5data);

          var list = deg5data.list

          for (var i = 0; i < list.length; i++)

          var currentDate = list[4].dt_txt
          console.log(currentDate);
          cityDayOneDate.textContent = currentDate
        })  
    });
};
getCityApi();
