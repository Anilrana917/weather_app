import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const WeatherDisplay = () => {
  const weather = useSelector((state) => state.weather.current);
  const forecast = useSelector((state) => state.weather.forecast);
  const status = useSelector((state) => state.weather.status);
  const error = useSelector((state) => state.weather.error);

  if (status === "loading") {
    return (
      <Container className='mt-4 text-center'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (status === "failed") {
    return (
      <Container className='mt-4'>
        <Alert variant='danger'>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className='mt-4'>
      {weather && (
        <Card className='mb-4'>
          <Card.Body>
            <Card.Title>{weather.name}</Card.Title>
            <Card.Text>
              <strong>Temperature:</strong> {weather.main.temp}°C
              <br />
              <strong>Feels Like:</strong> {weather.main.feels_like}°C
              <br />
              <strong>Humidity:</strong> {weather.main.humidity}%<br />
              <strong>Wind Speed:</strong> {weather.wind.speed} m/s
              <br />
              <strong>Weather:</strong> {weather.weather[0].description}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      {forecast && (
        <div>
          <h3>5-day Forecast</h3>
          <Row>
            {forecast.list.slice(0, 5).map((item) => (
              <Col key={item.dt} xs={12} md={6} lg={4}>
                <Card className='mb-4'>
                  <Card.Body>
                    <Card.Title>
                      {new Date(item.dt * 1000).toLocaleString()}
                    </Card.Title>
                    <Card.Text>
                      <strong>Temp:</strong> {item.main.temp}°C
                      <br />
                      <strong>Weather:</strong> {item.weather[0].description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default WeatherDisplay;
