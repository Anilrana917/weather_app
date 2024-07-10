import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import WeatherSearch from "./WeatherSearch";
import { BrowserRouter } from "react-router-dom";
import { fetchWeather, fetchForecast } from "../redux/weatherSlice";

jest.mock("../redux/weatherSlice", () => ({
  fetchWeather: jest.fn(),
  fetchForecast: jest.fn(),
}));

const mockStore = configureStore([]);

test("WeatherSearch renders and handles input", () => {
  const store = mockStore({});
  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <WeatherSearch />
      </BrowserRouter>
    </Provider>
  );

  const input = getByPlaceholderText("Enter location");
  fireEvent.change(input, { target: { value: "New York" } });

  expect(input.value).toBe("New York");

  const button = getByText("Search");
  fireEvent.click(button);

  expect(fetchWeather).toHaveBeenCalledWith("New York");
  expect(fetchForecast).toHaveBeenCalledWith("New York");
});

test("WeatherSearch handles Enter key press", () => {
  const store = mockStore({});
  const { getByPlaceholderText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <WeatherSearch />
      </BrowserRouter>
    </Provider>
  );

  const input = getByPlaceholderText("Enter location");
  fireEvent.change(input, { target: { value: "New York" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

  expect(fetchWeather).toHaveBeenCalledWith("New York");
  expect(fetchForecast).toHaveBeenCalledWith("New York");
});
