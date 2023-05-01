import logo from './logo.svg';
import './App.css';
import axios from "axios";
function App() {
  const api = (e) => {
    axios
      .get("http://3.34.232.63:8080/test/stringTest")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.message);
        console.log(e.code);
      });
  };
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
        <button onClick={api}>로그인 없어도 정상</button>
      </header>
    </div>
  );
}

export default App;
