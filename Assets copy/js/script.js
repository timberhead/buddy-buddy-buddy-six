
var currentcity = document.querySelector("#current-city")



//  https://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=5&appid=dc33e42431b8cb4dcd79b6089776f818


function fetchcoord() {

    var api = "https://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=5&appid=dc33e42431b8cb4dcd79b6089776f818"
    fetch(api)
        .then(function (res) {

            return res.json()

        })
        .then(function (data) {
            console.log(data);
            console.log(data[0].lat)

            var lat = data[0].lat
            var lon = data[0].lon

            fetchweather(lat, lon)


        })


}

function fetchweather(lat, lon) {

    var api2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&cnt=5&appid=dc33e42431b8cb4dcd79b6089776f818`
    fetch(api2)
        .then(function (res) {

            return res.json()

        })
        .then(function (data) {
            console.log(data);

            currentcity.textContent = data.name





        })

}

function fetchuvi(){

    // var api3 =
}

fetchcoord()