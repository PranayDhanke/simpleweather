import React, { useState } from "react";
import "./Weather.css";

import SearchImg from "../images/search.png";
import HumImage from "../images/humidity.png";
import WinSpedImg from "../images/wind.png";

import CloudImage from "../images/cloud.png";
import ClearImage from "../images/clear.png";
import DizzImage from "../images/drizzle.png";
import RainImage from "../images/rain.png";
import SnowImage from "../images/snow.png";

const Weather = () => {
  const [TempValue, setTempValue] = useState("New York");
  const [icon, seticon] = useState("");

  const [Temp, setTemp] = useState("");
  const [cName, setCName] = useState("");
  const [Hum, setHum] = useState("");
  const [Winds, setWinds] = useState("");

  let API_Key = "e214524cb2b3b7a59dc597dff8a68773";

  const selecalled = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${TempValue}&units=Metric&appid=${API_Key}`;
    try {
      let responce = await fetch(url);
      let data = await responce.json();

      setTemp(data.main.temp);
      setHum(data.main.humidity);
      setWinds(data.wind.speed);
      setCName(data.name);

      let wicon = data.weather[0].main;

      if (wicon === "Clear") {
        seticon(ClearImage);
      } else if (wicon === "Haze") {
        seticon(DizzImage);
      } else if (wicon === "Clouds") {
        seticon(CloudImage);
      } else if (wicon === "Rain") {
        seticon(RainImage);
      } else if (wicon === "Snow") {
        seticon(SnowImage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  selecalled();

  const search = async () => {
    const element = document.getElementsByClassName("SearchBar");

    if (element[0].value === "") {
      return 0;
    } else {
      setTempValue(element[0].value);
    }
  };

  return (
    <div className="Weather">
      <div className="Search-Bar">
        <input
          type="text"
          placeholder="Search"
          id="SearchBar"
          className="SearchBar"
        />
        <div
          className="Search_btn"
          onClick={() => {
            search();
          }}
        >
          <img src={SearchImg} alt="" />
        </div>
      </div>
      <div className="Whether-Report-DI">
        <img className="Image" src={icon} alt="" />
        <h1>
          <span className="TempPercentage">{Temp}</span>°c
        </h1>
        <h3 className="TempCity">{cName}</h3>
      </div>
      <div className="HumWinSpeed">
        <div className="Humidity-Container">
          <img src={HumImage} alt="" />
          <div className="hum-low">
            <h3 className="Humidity_value">{Hum} %</h3>
            <span>Humadity</span>
          </div>
        </div>
        <div className="Wind-Container">
          <img src={WinSpedImg} alt="" />
          <div className="wind-low">
            <h3 className="Wind_value">{Winds} Km/h</h3>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Weather;
