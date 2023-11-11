// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = '3e64bb558c78b52d3cfbdcb7306f2e73';
const resultDiv = document.getElementById('result');

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getAirQuality);
    } else {
        resultDiv.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getAirQuality(position) {
    const { latitude, longitude } = position.coords;
    const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const airQualityIndex = data.list[0].main.aqi;
            const message = `Air Quality Index: ${airQualityIndex}`;

            resultDiv.innerHTML = message;
        })
        .catch(error => {
            resultDiv.innerHTML = "Error fetching air quality data.";
            console.error('Error fetching air quality data:', error);
        });
}

