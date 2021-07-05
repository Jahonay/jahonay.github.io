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
}

async function getTemp(name){
    var cityName = name;
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=f70dd531494e4c446db8acff3273ab2c', {mode: "cors"})
    const w = await response.json();
    var temp = w.main.temp;
    var icon= w.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    
    var humidity = w.main.humidity;
    var pressure = w.main.pressure;
    var max = w.main.temp_max;
    var min= w.main.mp_min;
    var description= w.weather[0].description;
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
    var feels = w.main.feels_like;
    feel.innerText=desc;
    var feel = document.createElement('p');
    

}

/* get default values*/
setWeather(getTemp('nahant'));
seticon(geticon('nahant'));
setName('nahant');
getDesc('Nahant');

