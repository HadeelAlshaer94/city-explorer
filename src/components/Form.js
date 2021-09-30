import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';


class Cityform extends Component {
    cityInfo = (event) => {
        event.preventDefault();
        this.props.inputForm(event.target.cityName.value);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.cityInfo}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>City Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter city name" name='cityName' />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Explor
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Cityform;

