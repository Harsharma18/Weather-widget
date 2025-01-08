// let searchInput = document.getElementById("cityInput");
// let searchButton = document.getElementById("searchButton");
// const API_KEY = "c2bfc7fd5e015418b37692767396534f";
// const currentLocation = document.getElementById("currLoc");
// async function fetchDataByCity(cityname) {
//   try {
//     let city = searchInput.value;
//     searchInput.value = "";
//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
//     const response = await fetch(url);
//     let data = await response.json();
//     console.log(data);

//     if (data.message) {
//       document.getElementById(
//         "thirddiv"
//       ).innerHTML = `<h1>${city} ${data.message}</h1>`;

//       return;
//     }
//     displayWeather(data);
//   } catch (e) {
//     console.log(e);
//   }
// }
// async function fetchDataByCoordinates(lat, lng) {
//   try {
//     console.log(lat, lng);
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
//     const response = await fetch(url);
//     let data = await response.json();
//     console.log(data);

//     if (data.message) {
//       document.getElementById(
//         "thirddiv"
//       ).innerHTML = `<h1>${city} ${data.message}</h1>`;

//       return;

//     }
//     displayWeather(data);
//   } catch (e) {
//     console.log(e);
//   }
// }
// searchButton.addEventListener("click", () => {
//   let city = searchInput.value;
//   console.log(city);

//   fetchDataByCity(city);
// });
// currentLocation.addEventListener("click", () => {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       let lat = position.coords.latitude;
//       let lng = position.coords.longitude;
//       console.log(lat, lng);
//       fetchDataByCoordinates(lat, lng);

//     },
//     (error) => {
//       console.error("Error fetching location:", error);
//       alert("Unable to fetch location. Please enable location access.");
//     }
//   );
// });
// function displayWeather({ name, main, wind, weather }) {
//   document.getElementById("thirddiv").innerHTML = `
//     <div id="weatherInfo">
//         <p id="temp">${main.temp}°C</p>
//         <p class="desc">${weather[0].description}</p>
//         <img src='https://openweathermap.org/img/w/${weather[0].icon}.png'>
//         <p id="city">${name}</p>
//         <div class="otherInfo">
//             <div class="wind">
//                 <p>Wind</p>
//                 <p>${wind.speed}m/s</p>
//             </div>
//             <div class="wind">
//                 <p>Pressure</p>
//                 <p>${main.pressure}ma</p>
//             </div>
//             <div class="wind">
//                 <p>Humidity</p>
//                 <p>${main.humidity}%</p>
//             </div>
//         </div>
//     </div>`;
// }
let searchInput = document.getElementById("cityInput");
let searchButton = document.getElementById("searchButton");
const API_KEY = "c2bfc7fd5e015418b37692767396534f";
const currentLocation = document.getElementById("currLoc");
const secondDiv = document.getElementById("seconddiv");

async function fetchDataByCity(cityname) {
  try {
    let city = searchInput.value;
    searchInput.value = "";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if (data.message) {
      document.getElementById(
        "thirddiv"
      ).innerHTML = `<h1>${city} ${data.message}</h1>`;
      return;
    }
    displayWeather(data);
  } catch (e) {
    console.log(e);
  }
}

async function fetchDataByCoordinates(lat, lng) {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if (data.message) {
      document.getElementById(
        "thirddiv"
      ).innerHTML = `<h1>${data.message}</h1>`;
      return;
    }
    displayWeather(data);
  } catch (e) {
    console.log(e);
  }
}

searchButton.addEventListener("click", () => {
  let city = searchInput.value;
  fetchDataByCity(city);
});

currentLocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      fetchDataByCoordinates(lat, lng);
    },
    (error) => {
      console.error("Error fetching location:", error);
      alert("Unable to fetch location. Please enable location access.");
    }
  );
});
function displayWeather({ name, main, wind, weather, sys }) {
  const weatherImage = {
    Thunderstorm: "./assets/thunderstorm.jpg",
    Drizzle: "./assets/drizzle.jpg",
    Rain: "./assets/rainy.jpg",
    Snow: "./assets/snow.jpg",
    Mist: "./assets/mist.jpeg",
    Smoke: "./assets/clouds.jpg",
    Haze: "./assets/haze.jpeg",
    Fog: "./assets/foggy.jpg",
    Clear: "./assets/clearSky.jpg",
    Clouds: "./assets/clouds.jpg",
  };

  let currentWeather = weather[0].main;
  let imagePath = weatherImage[currentWeather] || "./assets/clearSky.jpg";

  console.log("Weather condition:", currentWeather);
  console.log("Image path:", imagePath);

  secondDiv.innerHTML = `<img src="${imagePath}" alt="${currentWeather}">`;

  document.getElementById("thirddiv").innerHTML = `
          <h1>${name}</h1>
                    <img src='https://openweathermap.org/img/w/${
                      weather[0].icon
                    }.png'>

          <p class="detail">Temperature: ${main.temp}°C (Feels like: ${
    main.feels_like
  }°C)</p>
          <p class="detail">Humidity: ${main.humidity}%</p>
          <p class="detail">Pressure: ${main.pressure} hPa</p>
          <p class="detail">Wind: ${wind.speed} m/s</p>
          <p class="detail">Sunrise: ${new Date(
            sys.sunrise
          ).toLocaleTimeString()}</p>
          <p class="detail">Sunset: ${new Date(
            sys.sunset
          ).toLocaleTimeString()}</p>
      `;
}
