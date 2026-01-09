document.querySelector("#search").addEventListener("submit" , async (event) =>{
    event.preventDefault();

    const cityName = document.querySelector("#city_name").value;
    
    if (!cityName){
        document.querySelector("#weather").classList.remove("show");
        showAlert("Voce precisa digitar uma cidade...");
    }
    // colocar your key!
    // const key = "";
    const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric&lang=pt_br`;

    const results = await fetch(urlApi);
    const json = await results.json();

    console.log(json);

    if (json.cod === 200){
        showInfo({
            city: json.name,
            country: json.sys.country,
            icon: json.weather[0].icon,
            temp: json.main.temp,
            description: json.weather[0].description,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            wind: json.wind.speed,
            humidity: json.main.humidity,
        })
    }else {

        document.querySelector("#weather").classList.remove("show");
        showAlert("Não foi possivel localizar....");
    }
    

});

function showInfo(json) {

    showAlert("");
    document.querySelector("#weather").classList.add("show");

    document.querySelector("#tittle").innerHTML = `${json.city} , ${json.country}`;
    document.querySelector("#img_weather").setAttribute("src", `https://openweathermap.org/img/wn/${json.icon}@2x.png`)
    document.querySelector("#temp_value").innerHTML = `${json.temp.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;
    document.querySelector("#temp_description").innerHTML = `${json.description}`;
    document.querySelector("#tempMin").innerHTML = `${json.tempMin.toFixed(1).toString().replace(".", ",")} <sup>°C</sup>`;
    document.querySelector("#tempMax").innerHTML = `${json.tempMax.toFixed(1).toString().replace(".", ",")}<sup>°C</sup>`;
    document.querySelector("#humidity").innerHTML = `${json.humidity}%`;
    document.querySelector("#wind").innerHTML = `${json.wind}km/h`;
    
}

function showAlert(msg) {
    document.querySelector("#alert").innerHTML = msg;
}