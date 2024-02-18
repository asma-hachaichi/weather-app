import React, { useState } from 'react';
import {Col, Row, Form, Button} from 'react-bootstrap';

function Weather() {
  const [weatherData, setWeatherData] = useState({
    "location": {
        "name": "Tunis",
        "region": "Gabes",
        "country": "Tunisia",
        "tz_id": "Africa/Tunis",
        "localtime": "2024-02-18 11:28"
    },
    "current": {
        "temp_c": 18.0,
        "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png"
        },
        "wind_kph": 6.8,
        "humidity": 77,
        "cloud": 50,
        "uv": 5.0,
    }
});
  const key= '62b6fe65e4174407ade91120241802';
  const [city, setCity] = useState('Tunis');
  const [image, setImage] = useState('https://www.adorama.com/alc/wp-content/uploads/2017/11/shutterstock_114802408.jpg');
  const [searchedCities, setSearchedCities] = useState([]);
  const fetchData1 = async () => {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData(data);
        // Update the list of searched cities without duplicates
        setSearchedCities(prevCities => {
            const cityExists = prevCities.includes(city);
            if (!cityExists) {
            const updatedCities = [city, ...prevCities];
            return updatedCities.slice(0, 5); // Keep only the last 5 cities
            }
            return prevCities;
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
};

  return (
    <>
        <Row className="App" style={{backgroundImage: `url(${image})`}}>
        <Col>
            <h1 className='title'>Weather App</h1>
            <div className='weather'>
                <Row>
                <Col className='temperature'>
                    <h1>{weatherData['current']['temp_c']}°C</h1>
                    <center><img src={`https:${weatherData['current']['condition']['icon']}`} /></center>
                </Col>
                <Col>
                    <h1>{weatherData['location']['name']}</h1>
                    <p><b>Region : </b>{weatherData['location']['region']}<br/>
                        <b>Country : </b>{weatherData['location']['country']}<br/>
                        <b>Time zone : </b>{weatherData['location']['tz_id']}<br/>
                        <b>Local Time : </b>{weatherData['location']['localtime']}</p>
                </Col>
                <Col>
                    <h1>{weatherData['current']['condition']['text']}</h1>
                    <p><b>Wind : </b>{weatherData['current']['wind_kph']} Km/h<br/>
                    <b>Humidity :  </b>{weatherData['current']['humidity']} %<br/>
                    <b>Cloud : </b>{weatherData['current']['cloud']}<br/>
                    <b>UV :  </b>{weatherData['current']['uv']}</p>
                </Col>
                </Row>
            </div>
        </Col>

        <Col>
            <div className='search'>
                <Form inline>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Search"
                            className=" mr-sm-2"
                            />
                        </Col>
                        <Col xs="auto">
                            <Button onClick={fetchData1}>Search</Button>
                        </Col>
                    </Row>
                </Form>
                <br/><hr/><br/>
                <h4>Last 5 searched cities :</h4><br/>
                {searchedCities.map((city, index) => (
                    <p key={index}>{city}</p>
                ))}
            </div>
        </Col>
        </Row>
        
    </>
  );
}

export default Weather ;
