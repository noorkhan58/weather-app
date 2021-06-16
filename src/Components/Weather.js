import React, { Component } from 'react'
import '../App.css'


const api_key = "17dcb7a7a095a23320cde5b3f46e6fc4";

export default class Weather extends Component {

constructor(props) {
    super(props)
    this.state = { 
        cityName:undefined,
        country:undefined,
        name:undefined,
        temp:undefined,
        temp_max:undefined,
        temp_min:undefined,
        description: undefined,
        sunrise: undefined
    } 
}

handleCityChange = (e) => {
    this.setState({
        cityName: e.target.value
    })
}

handleCountryChange = (e) => {
    this.setState({
        country: e.target.value
    })
}

getWeatherData = async() => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName},${this.state.country}&appid=${api_key}`)
    const response = await api_call.json()

    console.log(response)

    this.setState({
        name: response.name,
        temp: Math.floor(response.main.temp - 273),
        temp_max: Math.floor(response.main.temp_max - 273),
        temp_min: Math.floor(response.main.temp_min - 273),
        description: response.weather[0].description,
        sunrise: new Date(1000*response.sys.sunrise).getFullYear()

    })
}

 msToTime = (s) => {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    return hrs + ':' + mins + ':' + secs + '.' + ms;
  }


    render() {
        return (
            <div className="weather">
                <h1>Weather App</h1>
                <form>
                    <label>City: </label> <input type="text" placeholder="City" value={this.state.cityName} onChange={this.handleCityChange}/>
                    <label> Country: </label><input type="text" placeholder="Country" value={this.state.country} onChange={this.handleCountryChange}/>
                    <button type="button" onClick={this.getWeatherData}>Get Weather</button>
                </form>
                <div className={this.state.name !== undefined ? "": "weatherbox"}>
                <h2>{this.state.name}</h2>
                <h3>{this.state.temp}&deg;C</h3>
                <h4>Max: {this.state.temp_max}&deg;C Min: {this.state.temp_min}&deg;C</h4>
                <h5>Air Quality: {this.state.description}</h5>
                <h5>Sunrise: {this.state.sunrise}</h5>
                </div>
            </div>
        )
    }
}
