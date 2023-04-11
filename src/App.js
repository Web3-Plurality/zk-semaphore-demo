import './App.css';
import SemaphoreDemo from './SemaphoreDemo';
import React, { useEffect } from 'react';
import {init} from './Web3Client';

function App() {
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="App">
      <h1 class="display-4 text-left">Zero Knowledge based Identity Verification Layer Demo </h1>
      <SemaphoreDemo />
    </div>
  );
}

export default App;
