import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather, fetchForecast } from "../redux/weatherSlice";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const WeatherSearch = () => {
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (location.trim()) {
      dispatch(fetchWeather(location));
      dispatch(fetchForecast(location));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <Container className='mt-4'>
      <Row className='justify-content-center'>
        <Col xs={12} md={8} lg={6}>
          <Form>
            <Form.Group controlId='formLocation'>
              <Form.Label>Enter Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </Form.Group>
            <Button
              variant='primary'
              onClick={handleSearch}
              className='mt-2 w-100'
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherSearch;
