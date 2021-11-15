import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Gradient from 'javascript-color-gradient';

import './App.css';

const App = () => {
  let [temp, setTemp] = useState('');
  let [slider, setSlider] = useState(10);
  let [bgColor, setBgColor] = useState('#fff');
  let [wtype, setWtype] = useState('');
  
  const getLocation = () : void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) =>
        apiCall(location.coords.latitude, location.coords.longitude)
      );
    } else {
      console.error('Cannot get Location');
    }
  }

  const apiCall = async (lat: any, lon: any) => {
    const url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
    const req = axios.get(url);
    const res = await req;

    setTemp(res.data.main.temp);
    setWtype(res.data.weather[0].description);
    setBgColor(getColor(res.data.main.temp));
    console.log(typeof wtype);
  };

  const getColor = (temp: number): string => {
    const colorGradient = new Gradient();
    colorGradient.setMidpoint(40);
    const color1 = '#00ffff'; // For temperature -10 deg and below
    const color2 = '#fff700'; // For temprature -30 deg and above
    const color3 = '#ff8c00';
    colorGradient.setGradient(color1, color2, color3);
    temp = Math.round(temp);
    if (temp <= -10) return color1;
    else if (temp > 30) return color2;
    else {
      return colorGradient.getArray()[temp + 9];
    }
  }
  
  const handleChange = (e: any) => {
    const val = e.target.value;
    setSlider(val);
    setTemp(val);
    setBgColor(getColor(val));
  }

  return (
    <div className='app' style={{ backgroundColor: bgColor }}>
      <div className='weather-control'>
        <h1>Weather App</h1>
        <div>
          <h3 onClick={getLocation}>GET WEATHER</h3>
        </div>
        <div>
          <label>
            <input
              id='typeinp'
              type='range'
              min='-10'
              max='30'
              value={slider}
              onChange={handleChange}
              step='1'
            />
            {slider}
          </label>
        </div>
      </div>
      <div className='weather-info'>
        <h3>WELCOME</h3>
        <h1>{temp ? `${temp} \xB0` : `--`}</h1>
        <h3>{temp ? wtype.toLocaleUpperCase() : `Loading...`}</h3>
      </div>
    </div>
  );
}

export default App;
