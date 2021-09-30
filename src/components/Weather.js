import React, { Component } from 'react';


class Weather extends Component {
    render() {
        return (
            <div>
                {this.props.weatherD.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>Date:{item.date}</p>
                            <p>desc:{item.desc}</p>
                        </div>
                    );
                })
                }
            </div>
        );
    }
}

export default Weather;
