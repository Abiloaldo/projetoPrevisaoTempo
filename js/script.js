//Variáveis e seleção de elementos
const apiKey = "2a65c1b64ecba354e54650a9344b72e6";
const apiCountry = "https://countryflagsapi.com/png/";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherElement = document.querySelector("#weather-data")

//Funções
const getWeatherData = async(city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    //pegar os dados da API
    let result = await fetch(apiWeatherUrl);
    //transformar em json
    result = await result.json();
    console.log(result);

    return result;
}    

const showWeatherData = async (city) => {
    let data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountry + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherElement.classList.remove("hide");
};

//Eventos

//capturar o a requisição de busca por nome da cidade
searchButton.addEventListener("click", (event) => {
    event.preventDefault();

    let city = cityInput.value;

    showWeatherData(city);
})

cityInput.addEventListener("keyup", (event) => {

    if(event.code === "Enter") {
        let city = event.target.value;

        showWeatherData(city);
    };
});