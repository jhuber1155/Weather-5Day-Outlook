// var cityName = document.getElementById("cityNameSearch")
var currentCityDay = document.getElementById("chosen-city-day")
var cityDayOneDate = document.getElementById("day-one")
var cityDayOne = document.getElementById("card-text-one")
var cityDayTwoDate = document.getElementById("day-two")
var cityDayTwo = document.getElementById("card-text-two")
var cityDayThreeDate = document.getElementById("day-three")
var cityDayThree = document.getElementById("card-text-three")
var cityDayFourDate = document.getElementById("day-four")
var cityDayFour = document.getElementById("card-text-four")
var cityDayFiveDate = document.getElementById("day-five")
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

            var dayOneDate = list[5].dt_txt
            var formatOneDate = dayjs(dayOneDate).format("M/DD/YYYY")
            cityDayOneDate.textContent = formatOneDate

            var dayTwoDate = list[13].dt_txt
            var formatTwoDate = dayjs(dayTwoDate).format("M/DD/YYYY")
            cityDayTwoDate.textContent = formatTwoDate

            var dayThreeDate = list[21].dt_txt
            var formatThreeDate = dayjs(dayThreeDate).format("M/DD/YYYY")
            cityDayThreeDate.textContent = formatThreeDate

            var dayFourDate = list[29].dt_txt
            var formatFourDate = dayjs(dayFourDate).format("M/DD/YYYY")
            cityDayFourDate.textContent = formatFourDate

            var dayFiveDate = list[37].dt_txt
            var formatFiveDate = dayjs(dayFiveDate).format("M/DD/YYYY")
            cityDayFiveDate.textContent = formatFiveDate

            var dayOneIcon = list[5].weather[0].icon
            var dayOneIconAdd = document.createElement("img");
            dayOneIconAdd.setAttribute("src", `https://openweathermap.org/img/wn/${dayOneIcon}.png`);
            cityDayOneDate.appendChild(dayOneIconAdd);

            var dayTwoIcon = list[13].weather[0].icon
            var dayTwoIconAdd = document.createElement("img");
            dayTwoIconAdd.setAttribute("src", `https://openweathermap.org/img/wn/${dayTwoIcon}.png`);
            cityDayTwoDate.appendChild(dayTwoIconAdd);

            var dayThreeIcon = list[21].weather[0].icon
            var dayThreeIconAdd = document.createElement("img");
            dayThreeIconAdd.setAttribute("src", `https://openweathermap.org/img/wn/${dayThreeIcon}.png`);
            cityDayThreeDate.appendChild(dayThreeIconAdd);

            var dayFourIcon = list[29].weather[0].icon
            var dayFourIconAdd = document.createElement("img");
            dayFourIconAdd.setAttribute("src", `https://openweathermap.org/img/wn/${dayFourIcon}.png`);
            cityDayFourDate.appendChild(dayFourIconAdd);

            var dayFiveIcon = list[37].weather[0].icon
            var dayFiveIconAdd = document.createElement("img");
            dayFiveIconAdd.setAttribute("src", `https://openweathermap.org/img/wn/${dayFiveIcon}.png`);
            cityDayFiveDate.appendChild(dayFiveIconAdd);

            var dayOneTemp = list[5].main.temp
            var dayOneTempAdd = document.createElement("p");
            dayOneTempAdd.textContent = ("Temp: " + dayOneTemp + "\xB0")
            cityDayOneDate.appendChild(dayOneTempAdd);

            var dayTwoTemp = list[13].main.temp
            var dayTwoTempAdd = document.createElement("p");
            dayTwoTempAdd.textContent = ("Temp: " + dayTwoTemp + "\xB0")
            cityDayTwoDate.appendChild(dayTwoTempAdd);

            var dayThreeTemp = list[21].main.temp
            var dayThreeTempAdd = document.createElement("p");
            dayThreeTempAdd.textContent = ("Temp: " + dayThreeTemp + "\xB0")
            cityDayThreeDate.appendChild(dayThreeTempAdd);

            var dayFourTemp = list[29].main.temp
            var dayFourTempAdd = document.createElement("p");
            dayFourTempAdd.textContent = ("Temp: " + dayFourTemp + "\xB0")
            cityDayFourDate.appendChild(dayFourTempAdd);

            var dayFiveTemp = list[37].main.temp
            var dayFiveTempAdd = document.createElement("p");
            dayFiveTempAdd.textContent = ("Temp: " + dayFiveTemp + "\xB0")
            cityDayFiveDate.appendChild(dayFiveTempAdd);

            var dayOneWind = list[5].wind.speed
            var dayOneWindAdd = document.createElement("p");
            dayOneWindAdd.textContent = (" " + dayOneWind + " MPH") 
            dayOneTempAdd.appendChild(dayOneWindAdd);

            var dayTwoWind = list[13].wind.speed
            var dayTwoWindAdd = document.createElement("p");
            dayTwoWindAdd.textContent = (" " + dayTwoWind + " MPH") 
            dayTwoTempAdd.appendChild(dayTwoWindAdd);

            var dayThreeWind = list[21].wind.speed
            var dayThreeWindAdd = document.createElement("p");
            dayThreeWindAdd.textContent = (" " + dayThreeWind + " MPH") 
            dayThreeTempAdd.appendChild(dayThreeWindAdd);

            var dayFourWind = list[29].wind.speed
            var dayFourWindAdd = document.createElement("p");
            dayFourWindAdd.textContent = (" " + dayFourWind + " MPH") 
            dayFourTempAdd.appendChild(dayFourWindAdd);

            var dayFiveWind = list[37].wind.speed
            var dayFiveWindAdd = document.createElement("p");
            dayFiveWindAdd.textContent = (" " + dayFiveWind + " MPH") 
            dayFiveTempAdd.appendChild(dayFiveWindAdd);

            var dayOneHumidity = list[5].main.humidity  
            var dayOneHumidityAdd = document.createElement("p");
            dayOneHumidityAdd.textContent = (dayOneHumidity + "%")
            dayOneWindAdd.appendChild(dayOneHumidityAdd);

            var dayTwoHumidity = list[13].main.humidity  
            var dayTwoHumidityAdd = document.createElement("p");
            dayTwoHumidityAdd.textContent = (dayTwoHumidity + "%")
            dayTwoWindAdd.appendChild(dayTwoHumidityAdd);

            var dayThreeHumidity = list[21].main.humidity  
            var dayThreeHumidityAdd = document.createElement("p");
            dayThreeHumidityAdd.textContent = (dayThreeHumidity + "%")
            dayThreeWindAdd.appendChild(dayThreeHumidityAdd);

            var dayFourHumidity = list[29].main.humidity  
            var dayFourHumidityAdd = document.createElement("p");
            dayFourHumidityAdd.textContent = (dayFourHumidity + "%")
            dayFourWindAdd.appendChild(dayFourHumidityAdd);

            var dayFiveHumidity = list[37].main.humidity  
            var dayFiveHumidityAdd = document.createElement("p");
            dayFiveHumidityAdd.textContent = (dayFiveHumidity + "%")
            dayFiveWindAdd.appendChild(dayFiveHumidityAdd);
    });
});
}
getCityApi();


// var fiveDayForecast = {
//     date: "",
//     icon: "",
//     temp: "",
//     wind: "",
//     humidity: ""
// };

// for (var i = 3; i < data[i].length; i += 8){
//     fiveDayForecast.date = data[i].dt_txt
//     fiveDayForecast.icon = data[i].weather
//     fiveDayForecast.temp = data[i].main.temp
//     fiveDayForecast.wind = data[i].main.wind.speed
//     vfiveDayForecast.humidity = data[i].main.humidity

//     fiveDayDate = fiveDayForecast.date
//     fiveDayIcon = fiveDayForecast.icon
//     fiveDayTemp = fiveDayForecast.temp
//     fiveDayHumdity = fiveDayForecast.humidity

//     fiveDayForecast[0] = cityDayOne.textContent
//     fiveDayForecast[1] = cityDayTwo.textContent
//     fiveDayForecast[2] = cityDayThree.textContent
//     fiveDayForecast[3] = cityDayFour.textContent
//     fiveDayForecast[4] = cityDayFive.textContent

//     cityDayOneDate.appendChild(cityDayOne)
//     cityDayTwoDate.appendChild(cityDayTwo)
//     cityDayThreeDate.appendChild(cityDayThree)
//     cityDayFourDate.appendChild(cityDayFour)
//     cityDayFiveDate.appendChild(cityDayFive)
// }