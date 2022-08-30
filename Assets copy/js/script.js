
var currentCity = document.querySelector("#current-city")



//   https://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=5&appid=dc33e42431b8cb4dcd79b6089776f818

//  593dffef045e4e12b338722892adbff3

//  https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY593dffef045e4e12b338722892adbff3 


function fetchWeather() {

    var api = "https://api.weatherbit.io/v2.0/forecast/daily?city=Denver, CO&key=593dffef045e4e12b338722892adbff3"
    fetch(api)
        .then(function (res) {



        })
        // .then((response) => response.json());
        
        // console.log(data[0].lat)
        
        // console.log(data);
        // var lat = data[0].lat
        // var lon = data[0].lon
        
        // fetchweather(lat, lon)
    }
    
    
    // .then((data) => this.displayweather(data));

function displayWeather(data) {

    const { currentCity } = data;
    const { icon, description } = data.fetchweather;
    const { temp, humidity } = data.weather[0];
    const { speed } = data.wind;
    const { index } = data.index;

    console.log(currentCity, icon, description, temp, humidity, speed, index);

    document.querySelector(".city").innerText = "Weather in" + name;
    document.querySelector(".icon").src = "API" + icon + ".png";
    document.querySelector(".desscription").innerText = description;
    document.querySelector(".temp").innerText = temp + "F";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "mph";






}


fetchWeather()
displayWeather()


