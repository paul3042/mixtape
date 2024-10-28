import React, { useState } from "react";

function SearchBar({ className, setTracks, searchType,
    setSearchType, setSearchErrorMessage, setSearchSubmitted, userId,
    accessToken, tokenExpirationTime, tokenErrorMessage }) {
    const [userInput, setUserInput] = useState('');
    const [loginMessage, setLoginMessage] = useState('');


    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }

    const handleSearchType = (e) => {
        setSearchType(e.target.value);
    }


    let query;
    if (searchType === 'album') {
        query = `album:"${encodeURIComponent(userInput.trim())}"`
    } else if (searchType === 'artist') {
        query = `artist:"${encodeURIComponent(userInput.trim())}"`
    } else if (searchType === 'name') {
        query = `track:"${encodeURIComponent(userInput.trim())}"`
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserInput('');
        setSearchErrorMessage('');
        setSearchSubmitted(true);

        if (!userId) {
            setLoginMessage('Please login');
        } else {
            if (!userInput) {
                setTracks([])
                setSearchSubmitted(false);
                return
            };

            const accessToken = localStorage.getItem('access_token');

            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/search?q=${query}&type=track`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    setTracks([]);
                    setSearchErrorMessage('Error fetching songs');
                    throw new Error('Network response not ok');
                }

                const data = await response.json();
                const trackObjects = data.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists.map(artist => artist.name).join(', '),
                    album: track.album.name,
                    uri: track.uri,
                    preview_url: track.preview_url,
                }));

                setTracks(trackObjects);

            } catch (error) {
                console.error('Error fetching tracks:', error);
                setSearchErrorMessage('Error fetching songs');
            }
        };
    }


    return (
        <div className={className}>
            {accessToken && (
                <>
                    {userId ? (
                        <>
                            <p>Signed in as {userId}</p>
                            {tokenErrorMessage ? (<p style={{ color: 'red' }}>{tokenErrorMessage}</p>)
                                : (<p>Session expires at {new Date(parseInt(tokenExpirationTime)).toLocaleTimeString()}</p>)}
                        </>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </>)}

            <form onSubmit={handleSubmit}>

                <input
                    id="searchbar"
                    type="search"
                    placeholder={`search by ${searchType}`}
                    value={userInput}
                    onChange={handleUserInput} />
                <br />

                <label htmlFor="radio-name">Search songs by: </label>
                <input
                    id="radio-name"
                    type="radio"
                    value="name"
                    checked={searchType === 'name'}
                    onChange={handleSearchType} />
                <label htmlFor="radio-name">name</label>

                <input
                    id="radio-artist"
                    type="radio"
                    value="artist"
                    checked={searchType === 'artist'}
                    onChange={handleSearchType} />
                <label htmlFor="radio-artist">artist</label>

                <input
                    id="radio-album"
                    type="radio"
                    value="album"
                    checked={searchType === 'album'}
                    onChange={handleSearchType} />
                <label htmlFor="radio-album">album</label>

                <br />
                <button type="submit">Search</button>
            </form>
            <p>{loginMessage}</p>
        </div>
    );
};

export default SearchBar;