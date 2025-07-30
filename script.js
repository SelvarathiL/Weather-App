async function getWeather()
{
    const city = document.getElementById('cityInput').value;
    const weatherContainer = document.getElementById('weatherContainer');
    const weatherInfo = document.getElementById('weatherInfo');
    const errormsg = document.getElementById('errorMessage');
    const apiKey = "2516baa8f8b750e26ad2d41e1cdbc700";

    weatherInfo.style.display = "none";
    errormsg.style.display = "none";
    weatherContainer.classList.remove("show");

    if(!city){
        errormsg.textContent = "Please enter a city name";
        errormsg.style.display = "block";
        weatherContainer.classList.add("show");
        return;
    }

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if(!response.ok) throw new Error("City not found");

        const data = await response.json();
        console.log(data);
        document.getElementById('cityName').textContent = data.name;
        document.getElementById('temperature').textContent = `Temperature : ${data.main.temp}°C`;
        document.getElementById('description').textContent = `Condition : ${data.weather[0].description}`;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const temp = data.main.temp;
        let funnyLine = "";
        if(temp>35) funnyLine = "☀️The sun's showing off today!🌄";
        else if(temp<10) funnyLine = "❄️It's really chilly out there!⛄";
        else funnyLine = "🌥️Perfect weather to chill!🌞";

        document.getElementById('funnyLine').textContent = funnyLine;

        weatherInfo.style.display = "block";
        weatherContainer.classList.add("show");
        errormsg.style.display = "none";
    }catch(err)
    {
        weatherInfo.style.display = "none";
        weatherContainer.classList.add("show");
        errormsg.textContent = "City not found. Try another one!";
        errormsg.style.display = "block";
    }
}