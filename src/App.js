import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const BASE_URL = "";
  const fetch = async () => {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/test/stringTest`,
    });
    console.log(response.data);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h2> Homebrew FE </h2>
        <h2> Build... </h2>
      </header>
    </div>
  );
}

export default App;
