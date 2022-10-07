let today = new Date();
let month = today.toLocaleString('default', { month: 'long' });
let currentDate =
  (month) + " " + today.getDate() + ", " + today.getFullYear();
let currentTime =
  today.toLocaleTimeString();

console.log(currentDate);
console.log(currentTime);

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
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=2d8475319de9c96b16189b154959ebf6&units=imperial`;
  let request = new XMLHttpRequest();
  request.open("GET", apiURL);
  request.send();
  request.onload = () => {
    //The request is the call and response

    if (request.status === 200) {
      let apiData = JSON.parse(request.response);
      document.getElementById(
        "city"
      ).innerHTML = `Current conditions: ${apiData.name}`;
      console.log(apiData);
      //change temp on this line with similar code once city is working
      document.getElementById("description-id").innerHTML =
        apiData.weather[0].main;
      document.getElementById("humidity-id").innerHTML = apiData.main.humidity;
      document.getElementById("wind-id").innerHTML = Math.round(
        apiData.wind.speed
      );
      document.getElementById("temp-id").innerHTML = Math.round(
        apiData.main.temp
      );
    } else {
      alert("Invalid city. Please enter a valid city.");
    }
  };
}


function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
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
      console.log(apiData);

    document.getElementById("city").innerHTML = `Current conditions: ${apiData.name}`;
    
    //Good
    document.getElementById("description-id").innerHTML = apiData.weather[0].main;
    document.getElementById("humidity-id").innerHTML = apiData.main.humidity;
    document.getElementById("wind-id").innerHTML = Math.round(apiData.wind.speed);

    document.getElementById("temp-id").innerHTML = Math.round(apiData.main.temp);
    }
  };
}


let curLocButton = document.querySelector("#current-location");
curLocButton.addEventListener("click", getCurrentPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}



getCurrentPosition();

//Celsius and Fahrenheit buttons
function changeToC(event) {
  event.preventDefault();
  let changeToC = document.querySelector("#celsius-button");
  document.getElementById("temp-id").innerHTML = "15";
}

function changeToF(event) {
  event.preventDefault();
  let changeToF = document.querySelector("#fahrenheit-button");
  document.getElementById("temp-id").innerHTML = "59";
}

//let clickC = document.querySelector("#celsius-button");
//clickC.addEventListener("click", changeToC);

//let clickF = document.querySelector("#fahrenheit-button");
//clickF.addEventListener("click", changeToF);