import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cityform from './components/Form';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      showdata:false,
      cityName: '',
      showError:false
    };
  }

  getLocation = async () => {
    try{
      let locationLink = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.cityName}&format=json`;
      let urlData = await axios.get(locationLink);
      this.setState({
        data: urlData.data[0],
        showdata:true
      });
    }catch{
      this.setState({
        showdata:false,
        showError:true
      });
    }
    
  };

  inputForm = async (input) => {
    await this.setState({
      cityName: input,


    });

    this.getLocation();

  }

  render() {
    return (
      <div>

        <Cityform inputForm={this.inputForm} />
        {this.state.showdata&&
        <div>
          <p>lat:{this.state.data.lat}</p>
          <p>lon: {this.state.data.lon}</p>
          <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.data.lat},${this.state.data.lon}&zoom=10`} alt="" />
        </div>
        }
        {this.state.showError&&
        <p>Error 404</p>
        }

      </div>
    );
  }
}

export default App;
