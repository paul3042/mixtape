import React, { useState } from 'react';
import SpotifyLogin from './Components/SpotifyLogin';

import './App.css';


function App() {
  const [userId, setUserId] = useState('');

  return (
    <div className="App">
      <h1>mixtape</h1>
      <SpotifyLogin
        userId={userId}
        setUserId={setUserId} />
    </div>
  );
}

export default App;