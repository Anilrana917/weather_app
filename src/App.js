import React from "react";
import WeatherSearch from "./components/WeatherSearch";
import WeatherDisplay from "./components/WeatherDisplay";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className='container'>
        <h1 className='my-4 text-center'>Weather App</h1>
        <WeatherSearch />
        <WeatherDisplay />
      </div>
    </Provider>
  );
}

export default App;
