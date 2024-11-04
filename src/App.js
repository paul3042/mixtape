import React, { useState } from 'react';

import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResults';
import Playlist from './Components/Playlist';

import './App.css';


function App() {
  const [userId, setUserId] = useState('');
  const [tracks, setTracks] = useState([]);
  const [searchType, setSearchType] = useState('name');
  const [searchErrorMessage, setSearchErrorMessage] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState('Your Playlist');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [tokenErrorMessage, setTokenErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const [tokenExpirationTime, setTokenExpirationTime] = useState(null);

  return (
    <div className="App headingFont">
      <Header
        className="header"
        setUserId={setUserId}
        setTokenErrorMessage={setTokenErrorMessage}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        setTokenExpirationTime={setTokenExpirationTime} />

      <SearchBar
        className="searchbar bodyFont"
        tokenErrorMessage={tokenErrorMessage}
        accessToken={accessToken}
        tokenExpirationTime={tokenExpirationTime}
        setTracks={setTracks}
        searchType={searchType}
        setSearchType={setSearchType}
        setSearchErrorMessage={setSearchErrorMessage}
        setSearchSubmitted={setSearchSubmitted}
        userId={userId} />

      <SearchResults
        className="search-results bodyFont"
        tracks={tracks}
        searchErrorMessage={searchErrorMessage}
        selectedTracks={selectedTracks}
        setSelectedTracks={setSelectedTracks}
        searchSubmitted={searchSubmitted} />

      <Playlist
       className="playlist bodyFont"      
        userId={userId}
        selectedTracks={selectedTracks}
        setSelectedTracks={setSelectedTracks}
        playlistTitle={playlistTitle}
        setPlaylistTitle={setPlaylistTitle} />
    </div>
  );
}

export default App;