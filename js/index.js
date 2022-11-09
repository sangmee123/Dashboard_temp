/* 날짜, 시간 */
function getTime() {
    var date = document.querySelector('.date')
    var clock = document.querySelector('.time');

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDay();

    var h = today.getHours();
    var m = today.getMinutes();

    var dateString = year + '.' + month + '.' + day;
    date.innerHTML = dateString;
    var timeString = h + ':' + m;
    clock.innerHTML = `${h<10 ? `0${h}`:h}:${m<10 ? `0${m}`:m}`
}

function init_Clock() {
    setInterval(getTime, 1000);
}

init_Clock();

/* 날씨 API */
const getJSON = function(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      const status = xhr.status;
      if(status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  };

  getJSON('http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=7b25d47b3c02e4069876383772c479c5&units=metric', 
  function(err, data) {
        var weatherText = `${data.weather[0].main}`;
        var weatherIcon = `${data.weather[0].icon}`; 
        var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        var img = document.querySelector('#img0');
        if(err !== null) 
                console.log('예상치 못한 오류 발생.' + err);
        else {
                img.src = url;    
                $('.weather_li0').append(weatherText);
                $('.weather_li0').append(` / 서울 ${data.main.temp}°`); 
        }
  });
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=incheon&appid=7b25d47b3c02e4069876383772c479c5&units=metric',
  function(err, data) {
        var weatherText = `${data.weather[0].main}`;
        var weatherIcon = `${data.weather[0].icon}`; 
        var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        var img = document.querySelector('#img1');
        if(err !== null) 
                console.log('예상치 못한 오류 발생.' + err);
        else {  
                img.src = url;
                $('.weather_li1').append(weatherText);
                $('.weather_li1').append(` / 인천 ${data.main.temp}°`);
        }
  });
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=Gyeonggi-do&appid=7b25d47b3c02e4069876383772c479c5&units=metric',
  function(err, data) {
        var weatherText = `${data.weather[0].main}`;
        var weatherIcon = `${data.weather[0].icon}`; 
        var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        var img = document.querySelector('#img2');
        if(err !== null) 
                console.log('예상치 못한 오류 발생.' + err);
        else {
                img.src = url;
                $('.weather_li2').append(weatherText);   
                $('.weather_li2').append(` / 경기도 ${data.main.temp}°`);

        }
  });
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=Gangwon-do&appid=7b25d47b3c02e4069876383772c479c5&units=metric',
  function(err, data) {
        var weatherText = `${data.weather[0].main}`;
        var weatherIcon = `${data.weather[0].icon}`; 
        var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        var img = document.querySelector('#img3');
        if(err !== null) 
                console.log('예상치 못한 오류 발생.' + err);
        else {
                img.src = url;
                $('.weather_li3').append(weatherText);
                $('.weather_li3').append(` / 강원도 ${data.main.temp}°`);
        }
  });
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=Chungcheongbuk-do&appid=7b25d47b3c02e4069876383772c479c5&units=metric',
  function(err, data) {
        var weatherText = `${data.weather[0].main}`;
        var weatherIcon = `${data.weather[0].icon}`; 
        var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        var img = document.querySelector('#img4');
        if(err !== null) 
                console.log('예상치 못한 오류 발생.' + err);
        else {
                img.src = url;
                $('.weather_li4').append(weatherText);
                $('.weather_li4').append(` / 충북 ${data.main.temp}°`);
        }
  });
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=Chungcheongnam-do&appid=7b25d47b3c02e4069876383772c479c5&units=metric',
  function(err, data) {
        var weatherText = `${data.weather[0].main}`;
        var weatherIcon = `${data.weather[0].icon}`; 
        var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        var img = document.querySelector('#img5');
        if(err !== null) 
                console.log('예상치 못한 오류 발생.' + err);
        else {
                img.src = url;                
                $('.weather_li5').append(weatherText);
                $('.weather_li5').append(` / 충남 ${data.main.temp}°`);
        }
  });
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=Jeollabuk-do&appid=7b25d47b3c02e4069876383772c479c5&units=metric',
  function(err, data) {
        var weatherText = `${data.weather[0].main}`;
        var weatherIcon = `${data.weather[0].icon}`; 
        var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        var img = document.querySelector('#img6');
        if(err !== null) 
                console.log('예상치 못한 오류 발생.' + err);
        else {
                img.src = url;
                $('.weather_li6').append(weatherText);
                $('.weather_li6').append(` / 전북 ${data.main.temp}°`);
        }
  });
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=Gyeongsangbuk-do&appid=7b25d47b3c02e4069876383772c479c5&units=metric',
  function(err, data) {
        var weatherText = `${data.weather[0].main}`;
        var weatherIcon = `${data.weather[0].icon}`; 
        var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        var img = document.querySelector('#img7');
        if(err !== null) 
                console.log('예상치 못한 오류 발생.' + err);
        else {
                img.src = url; 
                $('.weather_li7').append(weatherText);
                $('.weather_li7').append(` / 경북 ${data.main.temp}°`);           
        }
  });
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=Jeollanam-do&appid=7b25d47b3c02e4069876383772c479c5&units=metric',
  function(err, data) {
        var weatherText = `${data.weather[0].main}`;
        var weatherIcon = `${data.weather[0].icon}`; 
        var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        var img = document.querySelector('#img8');
        if(err !== null) 
                console.log('예상치 못한 오류 발생.' + err);
        else {
                img.src = url;
                $('.weather_li8').append(weatherText);
                $('.weather_li8').append(` / 전남 ${data.main.temp}°`);
        }
  });
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=Gyeongsangnam-do&appid=7b25d47b3c02e4069876383772c479c5&units=metric',
  function(err, data) {
        var weatherText = `${data.weather[0].main}`;
        var weatherIcon = `${data.weather[0].icon}`; 
        var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        var img = document.querySelector('#img9');
        if(err !== null) 
                console.log('예상치 못한 오류 발생.' + err);
        else {
                img.src = url;
                $('.weather_li9').append(weatherText);
                $('.weather_li9').append(` / 경남 ${data.main.temp}°`);
        }
  });
  getJSON('http://api.openweathermap.org/data/2.5/weather?q=jeju&appid=7b25d47b3c02e4069876383772c479c5&units=metric',
  function(err, data) {
        var weatherText = `${data.weather[0].main}`;
        var weatherIcon = `${data.weather[0].icon}`; 
        var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        var img = document.querySelector('#img10');
        if(err !== null) 
                console.log('예상치 못한 오류 발생.' + err);
        else {
                img.src = url;
                $('.weather_li10').append(weatherText);
                $('.weather_li10').append(` / 제주도 ${data.main.temp}°`);
        }
  });

  const API_KEY = "7b25d47b3c02e4069876383772c479c5";

  function onGeoOk(position){
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log("You live in", lat, lng);

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
      fetch(url)
          .then(response => response.json())
          .then(data => {
                var weatherIcon = `${data.weather[0].icon}`; 
                var url = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                var img = document.querySelector('#todayImg');
                img.src = url;

                const weather = document.querySelector("#weatherToday1"); 
                const city = document.querySelector("#weatherToday2");
                city.innerText = data.name;
                weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
                console.log(data);
      });
  }
  function onGeoError(){
      alert("Can't find you. No weather for you.");
  }
  navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);