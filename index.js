
let today = new Date();
let month = today.toLocaleString('default', { month: 'long' });
let currentDate =
  (month) + " " + today.getDate() + ", " + today.getFullYear();
let currentTime =
  today.toLocaleTimeString(undefined, {
    
    hour:   '2-digit',
    minute: '2-digit', 
    
  });

//console.log(currentDate);
//console.log(currentTime);

let searchInput = document.querySelector("#search-input");
var userInput;

document.getElementById("date-display").innerHTML = currentDate;
document.getElementById("time-display").innerHTML = currentTime;

//Search function, show current city info
function showInput(event) {
  event.preventDefault();
  userInput = searchInput.value;
  //event.preventDefault();
  console.log(searchInput.value);
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
      //console.log(apiData);
      //change temp on this line with similar code once city is working
      document.getElementById("description-id").innerHTML = apiData.weather[0].main;
      document.getElementById("humidity-id").innerHTML = apiData.main.humidity;
      document.getElementById("wind-id").innerHTML = Math.round(apiData.wind.speed);
      displayForecast();
      getFutureForecast(apiData.coord);
      let today = new Date();
      let currentTime =
      today.toLocaleTimeString(undefined, {
    
        hour:   '2-digit',
        minute: '2-digit', 
    
      });
      document.getElementById("time-display").innerHTML = currentTime;

      
      //Weather icon innerHTML
      //document.getElementById("weather-icon").innerHTML = apiData.weather[0].icon;
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
  //console.log(latitude);
  //console.log(longitude);
  let request = new XMLHttpRequest();
  let apiKey = "2d8475319de9c96b16189b154959ebf6";
  let url = `https://api.openweathermap.org/data/2.5/weather?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  request.open("GET", url);
  request.send();
  request.onload = () => {
    console.log(request);
    if (request.status != 200) {
      alert("Error");
    } else {
      let apiData = JSON.parse(request.response);
      //console.log(apiData);

    document.getElementById("city").innerHTML = `Current conditions: ${apiData.name}`;
    
    //Good
    document.getElementById("description-id").innerHTML = apiData.weather[0].main;
    document.getElementById("humidity-id").innerHTML = apiData.main.humidity;
    document.getElementById("wind-id").innerHTML = Math.round(apiData.wind.speed);
    let iconElement = document.getElementById("weather-icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", apiData.weather[0].description);
    document.getElementById("temp-id").innerHTML = Math.round(apiData.main.temp);
    displayForecast();
    getFutureForecast(apiData.coord);
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


function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
 
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  
  let forecastHTML = `<div class="row">`;

  days.forEach(function(day){
    
    forecastHTML = 
      forecastHTML + 
    `
      <div class="col">
          <div class="weather-forecast-date">
                ${day}
           </div>
              <div class="weather-forecast-icon">
                <i class="fa-solid fa-sun"></i>
              </div>
            <div class="weather-forecast-temps">
               <span class="weather-forecast-temp-max">
                    63°
               </span>
               <span class="weather-forecast-temp-min">
                    49°
               </span>  
            </div>  
        </div>       
  `;
});
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
  
  
}


displayForecast();



//Begin 10/18 work 
function getFutureForecast(coordinates){
  console.log(coordinates);

}