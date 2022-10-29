
let today = new Date();
let month = today.toLocaleString('default', { month: 'long' });
let currentDate =
  (month) + " " + today.getDate() + ", " + today.getFullYear();
let currentTime =
  today.toLocaleTimeString(undefined, {
    
    hour:   '2-digit',
    minute: '2-digit', 
    
  });



let searchInput = document.querySelector("#search-input");
var userInput;

document.getElementById("date-display").innerHTML = currentDate;
document.getElementById("time-display").innerHTML = currentTime;

//Search function, show current city info
function showInput(event) {
  event.preventDefault();
  userInput = searchInput.value;
  //event.preventDefault();
  //document.getElementById("city").innerHTML = `Current conditions: ${searchInput.value}`;
  
  apiFunction(userInput);
}


//Adding a listener for when the user hits the search button
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showInput);


// API function
function apiFunction(userInput) {
  isCelsius = false;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=2d8475319de9c96b16189b154959ebf6&units=imperial`;
  let request = new XMLHttpRequest();
  request.open("GET", apiURL);
  request.send();
  request.onload = () => {
    //The request is the call and response

    if (request.status === 200) {
      let apiData = JSON.parse(request.response);
     
      document.getElementById("city").innerHTML = `Current conditions: ${apiData.name}`;
      //change temp on this line with similar code once city is working
      document.getElementById("description-id").innerHTML = apiData.weather[0].main;
      document.getElementById("humidity-id").innerHTML = apiData.main.humidity;
      document.getElementById("wind-id").innerHTML = Math.round(apiData.wind.speed);
      //displayForecast();
      let today = new Date();
      let currentTime = today.toLocaleTimeString(undefined, {
    
        hour:   '2-digit',
        minute: '2-digit', 
    
      });
      document.getElementById("time-display").innerHTML = currentTime;

      getFutureForecast(apiData.coord.lat, apiData.coord.lon);
  
      let iconElement = document.getElementById("weather-icon");
      iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`);
      iconElement.setAttribute("alt", apiData.weather[0].description);
      document.getElementById("temp-id").innerHTML = Math.round(apiData.main.temp);
    }else {
      alert("Invalid city. Please enter a valid city.");
    }
  };

  
}


function showPosition(position) {
  isCelsius = false;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let request = new XMLHttpRequest();
  let apiKey = "2d8475319de9c96b16189b154959ebf6";
  let url = `https://api.openweathermap.org/data/2.5/weather?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  request.open("GET", url);
  request.send();
  request.onload = () => {
    
    if (request.status != 200) {
      alert("Error");
    } else {
      let apiData = JSON.parse(request.response);
    

    document.getElementById("city").innerHTML = `Current conditions: ${apiData.name}`;
    
    //Good
    document.getElementById("description-id").innerHTML = apiData.weather[0].main;
    document.getElementById("humidity-id").innerHTML = apiData.main.humidity;
    document.getElementById("wind-id").innerHTML = Math.round(apiData.wind.speed);
    let iconElement = document.getElementById("weather-icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", apiData.weather[0].description);
    document.getElementById("temp-id").innerHTML = Math.round(apiData.main.temp);
    //displayForecast();
    let today = new Date();
    let currentTime =
    today.toLocaleTimeString(undefined, {
    
      hour:   '2-digit',
      minute: '2-digit', 
    
  });
  document.getElementById("time-display").innerHTML = currentTime;

    }
  };


  
}


let curLocButton = document.querySelector("#current-location");
curLocButton.addEventListener("click", getCurrentPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}


getCurrentPosition();

let isCelsius = false; 

//Celsius and Fahrenheit buttons
function changeToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-id");
  if(!isCelsius){
    let celsiusTemp = (temperatureElement.innerHTML - 32) * 5 / 9;
    temperatureElement.innerHTML = Math.round(celsiusTemp);
    isCelsius = true;
  }
  
  //alert("C clicked");
}

function changeToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-id");
  if(isCelsius){
    let fahrenheitTemp = (temperatureElement.innerHTML * 9) /5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
    isCelsius = false;
  }
  //document.getElementById("temp-id").innerHTML = "59";
  //alert("F clicked");
}


let clickC = document.querySelector("#celsius-button");
clickC.addEventListener("click", changeToC);

let clickF = document.querySelector("#fahrenheit-button");
clickF.addEventListener("click", changeToF);

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return daysArray[day];
}


function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index){
    if(index < 6){
    forecastHTML = 
      forecastHTML + 
    `
      <div class="col">
          <div class="weather-forecast-date">
                ${formatDay(forecastDay.dt)}
           </div>
              <div class="weather-forecast-icon">
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png">
              </div>
            <div class="weather-forecast-temps">
               <span class="weather-forecast-temp-max">
                    ${Math.round(forecastDay.temp.max)}°
               </span>
               <span class="weather-forecast-temp-min">
                    ${Math.round(forecastDay.temp.min)}°
               </span>  
            </div>  
        </div>       
  `;
  }
});
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
   
}


//displayForecast();



//Begin 10/28 work 
function getFutureForecast(lat, lon){
  let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  
  axios.get(apiUrl).then(displayForecast);

}



