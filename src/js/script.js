'use strict'

const input = document.querySelector('.search');
const searchBtn = document.querySelector('.search-icon');
const getDeviceLocation = document.querySelector('.get-current-location');
const clearBtn = document.querySelector('.clear');
const quoteContainer = document.querySelector('.container');
const cardsContainer = document.querySelector('.weather-cards');
let temp = document.querySelector('.temp');
let description = document.querySelector('.description');
let humid = document.querySelector('.humid-temp');
let cityCountry = document.querySelector('.city-country');
let minMax = document.querySelector('.min-max-temp');
const weatherIcon = document.querySelector('.weather-icon')
// ============Clear Button Function===============

clearBtn.addEventListener('click',function(){
    input.value = '';
    quoteContainer.classList.remove('hidden');
    cardsContainer.classList.add('hidden');
})

// =========Get Device Location function=========

let lat,lng;

function getGeoLocation (position){
    navigator.geolocation.getCurrentPosition((position) => {
       lat = position.coords.latitude;
       lng = position.coords.longitude;
       console.log(lat,lng);
   },() => {
       alert("Could not get you location")
   });
}
getDeviceLocation.addEventListener('click',getGeoLocation);

// ============= Search weather by city name functionality===========

searchBtn.addEventListener('click',function(){
    const city = input.value;
    let apiKey = "bbf8d5e980c72026e64768d1c50ebe79";
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    const getWeather = async function(){
        const data = await fetch(api);

        let jsonData = await data.json()
        console.log(jsonData);

        const city =  await jsonData.name;
        const country = await jsonData.sys.country;
        const id = await jsonData.weather[0].id;
        // console.log(id);
        //current temp area functionality
        temp.textContent = `${jsonData.main.temp}\u00B0 C`;
        description.textContent = jsonData.weather[0].description;
        humid.textContent = `${jsonData.main.humidity}%`;
        minMax.textContent = `${jsonData.main.temp_max} / ${jsonData.main.temp_min}`;
        cityCountry.textContent = `${city}, ${country}`;

        // ============icons according to weather===========


    }

    getWeather();
})



    
