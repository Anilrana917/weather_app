import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import WeatherDisplay from "./WeatherDisplay";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([]);

test("WeatherDisplay renders correctly", () => {
  const initialState = {
    weather: {
      status: "succeeded",
      current: {
        name: "New York",
        main: {
          temp: 25,
          feels_like: 23,
          humidity: 70,
        },
        wind: {
          speed: 3,
        },
        weather: [{ description: "clear sky" }],
      },
      forecast: {
        list: [],
      },
    },
  };

  const store = mockStore(initialState);
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <WeatherDisplay />
      </BrowserRouter>
    </Provider>
  );

  expect(getByText("New York")).toBeInTheDocument();
  expect(getByText("Temperature: 25°C")).toBeInTheDocument();
  expect(getByText("Feels Like: 23°C")).toBeInTheDocument();
  expect(getByText("Humidity: 70%")).toBeInTheDocument();
  expect(getByText("Wind Speed: 3 m/s")).toBeInTheDocument();
  expect(getByText("Weather: clear sky")).toBeInTheDocument();
});
