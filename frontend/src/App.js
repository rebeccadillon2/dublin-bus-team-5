import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
