const box= document.getElementById('weather-box');
const temperature= document.getElementById('temperature');
const weather= document.getElementById('weather');
const icon= document.getElementById('icon');
const btn=document.getElementById('btn');
const city=document.getElementById('location');

/*btn.onclick=('click', handleBtn());*/


async function handleBtn(){
    var name = await document.getElementById('search').value;
    newSearch(name);
    setName(name);
}



async function setName(tname){
    var cityName=tname;
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=f70dd531494e4c446db8acff3273ab2c', {mode: "cors"})
    const w = await response.json();
    var t=w.name;
    var c=w.sys.country;
    var named= t + ', '+c;
    city.innerHTML=named;

}

async function newSearch(tname){
    var cityName=tname;
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=f70dd531494e4c446db8acff3273ab2c', {mode: "cors"})
    const w = await response.json();
    var t=w.name;
    setWeather(getTemp(t));
    seticon(geticon(t));
    getDesc(t);
    getFeels(t);
    getHumidity(t);

    getPressure(t);
}

async function getTemp(name){
    var cityName = name;
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=f70dd531494e4c446db8acff3273ab2c', {mode: "cors"})
    const w = await response.json();
    var temp = w.main.temp;
    var max = w.main.temp_max;
    var min= w.main.mp_min;
    console.log(w);
    return temp;search.value
}

async function setWeather(temp){
    K= await temp;
    F= (K - 273.15) * (9/5) + 32;
    temperature.innerHTML= Math.round(F) + '°';
}



async function geticon(name){
    var cityName=name;
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=f70dd531494e4c446db8acff3273ab2c', {mode: "cors"})
    const w = await response.json();
    var icon=w.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    return iconurl;
}

async function seticon(url){
    u = await url;
    var img=document.getElementById('icon');
    img.src=u;

}

async function getDesc(name){
    var cityName=name;
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=f70dd531494e4c446db8acff3273ab2c', {mode: "cors"})
    const w = await response.json();
    var desc = w.weather[0].description;
    weather.innerText=desc;

}

async function getFeels(name){
    var cityName=name;
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=f70dd531494e4c446db8acff3273ab2c', {mode: "cors"})
    const w = await response.json();
    var K = w.main.feels_like;
    feels= (K - 273.15) * (9/5) + 32;
   
    var feel = document.createElement('p');
    feel.innerText='feels like: '+ Math.round(feels) + '°';
    weather.appendChild(feel);
}

async function getHumidity(name){
    var cityName = name;
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=f70dd531494e4c446db8acff3273ab2c', {mode: "cors"})
    const w = await response.json();
    var humidity = w.main.humidity;
    var humid = document.createElement('p');
    humid.innerText='humidity: ' +humidity;
    weather.appendChild(humid);
}

async function getPressure(name){
    var cityName = name;
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=f70dd531494e4c446db8acff3273ab2c', {mode: "cors"})
    const w = await response.json();
    var pressure = w.main.pressure;
    var press = document.createElement('p');
    press.innerText='pressure: ' +pressure;
    weather.appendChild(press);
}

/* get default values*/
setWeather(getTemp('nahant'));
seticon(geticon('nahant'));
setName('nahant');
getDesc('Nahant');
getFeels('Nahant');
getHumidity('nahant');
getPressure('Nahant');

