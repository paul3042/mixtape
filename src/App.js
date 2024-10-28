import React, { useState } from 'react';

import SpotifyLogin from './Components/SpotifyLogin';
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResults';
import Playlist from './Components/Playlist';
import SaveToSpotify from './Components/SaveToSpotify';

import './App.css';


function App() {
  const [userId, setUserId] = useState('');
  const [tracks, setTracks] = useState([]);
  const [searchType, setSearchType] = useState('name');
  const [searchErrorMessage, setSearchErrorMessage] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState('Your Playlist');
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  return (
    <div className="App">
      <h1>mixtape</h1>
      <SpotifyLogin
        setUserId={setUserId} />
      <SearchBar
        setTracks={setTracks}
        searchType={searchType}
        setSearchType={setSearchType}
        setSearchErrorMessage={setSearchErrorMessage}
        setSearchSubmitted={setSearchSubmitted}
        userId={userId} />
      <SearchResults
        tracks={tracks}
        searchErrorMessage={searchErrorMessage}
        selectedTracks={selectedTracks}
        setSelectedTracks={setSelectedTracks}
        searchSubmitted={searchSubmitted} />
      <Playlist
        selectedTracks={selectedTracks}
        setSelectedTracks={setSelectedTracks}
        playlistTitle={playlistTitle}
        setPlaylistTitle={setPlaylistTitle} />
      <SaveToSpotify
        userId={userId}
        selectedTracks={selectedTracks}
        playlistTitle={playlistTitle} />
    </div>
  );
}

export default App;