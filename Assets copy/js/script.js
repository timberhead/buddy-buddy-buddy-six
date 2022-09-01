
//   https://api.openweathermap.org/geo/1.0/direct?q=Denver&limit=5&appid=dc33e42431b8cb4dcd79b6089776f818

//   593dffef045e4e12b338722892adbff3

// https://api.weatherbit.io / v2.0 / forecast / daily ? city = Raleigh, NC & key=API_KEY593dffef045e4e12b338722892adbff3

var apiKey = "593dffef045e4e12b338722892adbff3";
var today = moment().format('L');
var searchHistoryList = [];

function currentCondition(city) {

    var queryURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=5&units=I&key=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (cityWeatherResponse) {
        // console.log(cityWeatherResponse);

        $("#weatherContent").css("display", "block");
        $("#cityDetail").empty();

        var currentWeather = cityWeatherResponse.data[0]

        console.log(currentWeather);
        console.log(cityWeatherResponse);

        var iconCode = currentWeather.weather.icon;

        var iconURL = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;

        // WHEN I view current weather conditions for that city
        // THEN I am presented with the city name
        // the date
        // an icon representation of weather conditions
        // the temperature
        // the humidity
        // the wind speed
        var uvIndex = currentWeather.uv;


        // if (uvIndex < 3) {
        //     $("#uvIndexColor").addClass("green");
        //     console.log("here");
        // };

        // if (uvIndex >= 0 && uvIndex <= 2) {
        //     $("#uvIndexColor").css("color", "white");
        // } else if (uvIndex >= 3 && uvIndex <= 5) {
        //     $("#uvIndexColor").css("color", "white");
        // } else if (uvIndex >= 6 && uvIndex <= 7) {
        //     $("#uvIndexColor").css("color", "white");
        // } else if (uvIndex >= 8 && uvIndex <= 10) {
        //     $("#uvIndexColor").css("color", "white");
        // } else {
        //     $("#uvIndexColor").css("color", "white");
        // };

        var currentCity = $(`
            <h2 id="currentCity">
                ${cityWeatherResponse.city_name} ${today} <img src="${iconURL}" alt="${currentWeather.weather.description}" />
            </h2>
            <p>Temperature: ${currentWeather.temp} °F</p>
            <p>Humidity: ${currentWeather.rh}\%</p>
            <p>Wind Speed: ${currentWeather.wind_spd} mph</p>
            
        `);

        // var uvI = $(`<p>UV Index: 
        // <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
        // </p>`)
        var uvI = $("<p>").text("UV Index:");
        var uvBadge = $("<button>");
        uvBadge.addClass("btn btn-small");
        uvBadge.text(uvIndex);


        if (uvIndex < 3) {
            uvBadge.addClass("btn-success");
            console.log("here");
        } else if (uvIndex < 7) {
            uvBadge.addClass("btn-warning")
        } else {
            uvBadge.addClass("btn-danger")
        };


        uvI.append(uvBadge);
        $("#cityDetail").append(currentCity, uvI);
        // futureCondition(cityWeatherResponse.city_name)


    });
}


// function for future condition
function futureCondition(city) {

    // THEN I am presented with a 5-day forecast
    var futureURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=5&units=I&key=${apiKey}`;

    $.ajax({
        url: futureURL,
        method: "GET"
    }).then(function (futureResponse) {
        console.log(futureResponse);
        // $("#fiveDay").empty();
        $("#dateTime").text(futureResponse.data[0].datetime)

        for (let i = 1; i < 6; i++) {
            // var cityInfo = {
            //     date: futureResponse.data[i].datetime,
            //     icon: futureResponse.data[i].weather.icon,
            //     temp: futureResponse.data[i].high_temp,
            //     humidity: futureResponse.data[i].rh,
            // };

            console.log(futureResponse.data);

            // var currDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
            // var iconURL = `<img src="https://www.weatherbit.io/static/img/icons/${iconCode}.png"`;
console.log(futureResponse.data[i])
            // displays the date
            // an icon representation of weather conditions
            // the temperature
            // the humidity
            var futureCard = $(`
                <div class="pl-3">
                    <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
                        <div class="card-body">
                            <h5>${futureResponse.data[i].datetime}</h5>

                            <p>Temp: ${futureResponse.data[i].high_temp} °F</p>
                            <p>Humidity: ${futureResponse.data[i].rh}\%</p>
                        </div>
                    </div>
                <div>
            `);
            $("#fiveDay").append(futureCard)
            //     $("#fiveDay").append($(`
            //     <div class="pl-3">
            //         <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;">
            //             <div class="card-body">
            //                 <h5>${futureResponse.data[i].datetime}</h5>

            //                 <p>Temp: ${futureResponse.data[i].high_temp} °F</p>
            //                 <p>Humidity: ${futureResponse.data[i].rh}\%</p>
            //             </div>
            //         </div>
            //     <div>
            // `));
        }
    });
}

// add on click event listener 
$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    var city = $("#enterCity").val().trim();
    currentCondition(city);
    futureCondition(city);
    if (!searchHistoryList.includes(city)) {
        searchHistoryList.push(city);
        var searchedCity = $(`
            <li class="list-group-item">${city}</li>
            `);
        $("#searchHistory").append(searchedCity);
    };

    localStorage.setItem("city", JSON.stringify(searchHistoryList));
    console.log(searchHistoryList);
});

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
$(document).on("click", ".list-group-item", function () {
    var listCity = $(this).text();
    currentCondition(listCity);
    futureCondition(listCity);
});



// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
$(document).ready(function () {
    var searchHistoryArr = JSON.parse(localStorage.getItem("city"));

    if (searchHistoryArr !== null) {
        searchHistoryList = searchHistoryArr
        var lastSearchedIndex = searchHistoryList.length - 1;
        var lastSearchedCity = searchHistoryList[lastSearchedIndex];
        currentCondition(lastSearchedCity);
        console.log(`Last searched city: ${lastSearchedCity}`);
    }
});








