import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cityform from './components/Form';
import Weather from './components/Weather';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      weatherD: {},
      showdata: false,
      cityName: '',
      showError: false,
      showweatherdata: false
    };
  }

  getLocation = async () => {
    try {
      let locationLink = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.cityName}&format=json`;
      let urlData = await axios.get(locationLink);
      this.setState({
        data: urlData.data[0],
        showdata: true
      });
    } catch {
      this.setState({
        showdata: false,
        showError: true
      });
    }

  };

  inputForm = async (input) => {
    await this.setState({
      cityName: input,


    });

    this.getLocation();
    this.getweather();

  }

  getweather = async () => {
    try {
      let weatherLink = `${process.env.REACT_APP_PORTLINK}/weather?cityName=${this.state.cityName}`;
      console.log(weatherLink);
      let urlData = await axios.get(weatherLink);
      console.log(urlData);

      this.setState({
        weatherD: urlData.data,
        showweatherdata: true
      });
      console.log(this.state.weatherD);
    } catch {
      this.setState({
        showweatherdata: false,
        showError: true
      });
    }
  }

  render() {
    return (
      <div>

        <Cityform inputForm={this.inputForm} />
        {this.state.showdata &&
          <div>
            <p>lat:{this.state.data.lat}</p>
            <p>lon: {this.state.data.lon}</p>
            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.data.lat},${this.state.data.lon}&zoom=10`} alt="" />
          </div>
        }
        {this.state.showError &&
          <p>Error 404</p>
        }

        console.log(weatherD)
        {this.state.showweatherdata&&
          <Weather weatherD={this.state.weatherD} />
        }

      </div>
    );
  }
}

export default App;
