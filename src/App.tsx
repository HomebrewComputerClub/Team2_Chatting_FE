import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
function App() {
  const api = () => {
    axios
      .get("/test/stringTest")
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.message);
        console.log(e.code);
      });
  };
  const api2 = () => {
    axios
      .post("http://43.201.208.100:8080/auth/sendEmail/sok5188@gmail.com")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.message);
        console.log(e.code);
      });
  };
  useEffect(() => {
    api();
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
        <button onClick={api}>홈브루 get test API호출(CORS 설정 필요)</button>
        <button onClick={api2}>다른 프로젝트 이메일 전송 API</button>
      </header>
    </div>
  );
}

export default App;
