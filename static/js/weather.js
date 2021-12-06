const weather_data = async (event) => {
    // get the season and round
    event.preventDefault()
    let city = document.querySelector('#city').value
    let apiKey = '9477e778ab583260b4857dc0f5caca14'
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    // get request 
    let response = await axios.get(url);

    getWeather(response)
    
}
function getWeather(res){
    // get city and country 
    let cityName = res.data.name
    let country = res.data.sys.country
    cityCountry.innerText = `${cityName}, ${ country }`

    // get info
    let high = Math.round(convertToF(res.data.main.temp_max))
    let low = Math.round(convertToF(res.data.main.temp_min))
    let forcast = res.data.clouds.all
    let humidity = res.data.main.humidity
    
    // change background based on the temp
    if(low >= 80){
        // hot
        document.body.style.backgroundColor = "#ff6347"
    }
    else if(low > 50 && low < 80){
        // warm
        document.body.style.backgroundColor = "#ffc40c"
    }
    else {
        // cold
        document.body.style.backgroundColor = "#87cefa"
    }

    weatherData.innerHTML = `
        <div class="card mb-3 mx-auto mt-5"  style="max-width: 18rem;">
                <div class="card-header text-white" id="high">High</div>
                <div class="card-body">
                  <p class="card-text">${high}&deg; F</p>
                </div>
        </div>
        <div class="card mb-3 mx-auto"  style="max-width: 18rem;">
                <div class="card-header text-white" id="low">Low</div>
                <div class="card-body">
                  <p class="card-text">${low}&deg; F</p>
                </div>
        </div>
        <div class="card mb-3 mx-auto" style="max-width: 18rem;">
                <div class="card-header text-white" id="forcast">Forcast</div>
                <div class="card-body">
                  <p class="card-text">Clouds: ${forcast}</p>
                </div>
        </div>
        <div class="card mb-3 mx-auto" style="max-width: 18rem;">
                <div class="card-header text-white" id="humidity">Humidity</div>
                <div class="card-body">
                  <p class="card-text">${humidity}&percnt;</p>
                </div>
        </div>
    `

}
function convertToF(kelvin){
    return (kelvin - 273.15) * (9/5) + 32
}
document.getElementById('weather').addEventListener('submit', weather_data)