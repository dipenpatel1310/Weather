// api key 9b2a67e054e4be6e95dc682ff5daec3f
const api = "9b2a67e054e4be6e95dc682ff5daec3f";
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load' ,() =>{
    let long;
    let lat ;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // Storing Longitude and Latitude in variables
          // long = position.coords.longitude;
          // lat = position.coords.latitude;
          lat = 21.6417;
          long = 69.6293
          const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
          console.log(base)
    
          // Using fetch to get data
          fetch(base)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              const { temp } = data.main;
              const place = data.name;
              const { description, icon } = data.weather[0];
              const { sunrise, sunset } = data.sys;

              const iconUrl =`http://openweathermap.org/img/wn/${icon}@2x.png`;
              const fahrenheit = (temp *9) / 5 + 32;

              const sunriseGmt =new Date(sunrise * 1000);
              const sunsetGmt =new Date(sunset * 1000);

              iconImg.src =iconUrl;
              loc.textContent = `${place}`
              tempC.textContent = `${temp.toFixed(2) + "°C"}`
              tempF.textContent = `${fahrenheit.toFixed(2) + "°F"}`
              desc.textContent = `${description}`
              sunriseDOM.textContent = `${"Sunrise:- " + sunriseGmt.toLocaleDateString()} ,${sunriseGmt.toLocaleTimeString()}`
              sunsetDOM.textContent = `${"Sunset:- " + sunsetGmt.toLocaleDateString()} ,${sunsetGmt.toLocaleTimeString()}`
              

            });
        });
      }
   
})

