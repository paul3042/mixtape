import React, { useState } from "react";
import styles from "./Searchbar.module.css";
import button2 from "./button2.module.css";

function SearchBar({ className, setTracks, searchType,
    setSearchType, setSearchErrorMessage, setSearchSubmitted, userId,
    accessToken, tokenExpirationTime, tokenErrorMessage }) {
    const [userInput, setUserInput] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [emptySearch, setEmptySearch] = useState('');


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
        setEmptySearch('');

        if (!userId) {
            setLoginMessage(<p>Please login</p>);
        } else {
            if (!userInput) {
                setEmptySearch(<p>Please enter a search query!</p>);
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
        <div className={`${className} ${styles.div}`}>
            {accessToken ? (
                <div>
                    {userId ? (
                        <>
                            <p>Welcome, {userId}!</p>
                            {tokenErrorMessage ? (<p style={{ color: 'red' }}>{tokenErrorMessage}</p>)
                                : (<p>This session expires at {new Date(parseInt(tokenExpirationTime)).toLocaleTimeString()}</p>)}
                        </>
                    ) : (
                        <>
                            <p>Loading profile...</p>
                            <p>&nbsp;</p>
                        </>
                    )}
                </div>) : (
                (<div>
                    <p>Welcome, music lover!</p>
                    <p>Awaiting login</p>
                </div>)
            )}

            <form className={styles.form} onSubmit={handleSubmit}>

                <input
                    id="searchbar"
                    type="search"
                    placeholder={`search by ${searchType}`}
                    value={userInput}
                    onChange={handleUserInput} />
                <br />

                <label htmlFor="radio-name">Search songs by: </label>
                <br />
                <input
                    className={styles.radio}
                    id="radio-name"
                    type="radio"
                    value="name"
                    checked={searchType === 'name'}
                    onChange={handleSearchType} />
                <label className={styles.radio} htmlFor="radio-name">name</label>

                <input
                    className={styles.radio}
                    id="radio-artist"
                    type="radio"
                    value="artist"
                    checked={searchType === 'artist'}
                    onChange={handleSearchType} />
                <label className={styles.radio} htmlFor="radio-artist">artist</label>

                <input
                    className={styles.radio}
                    id="radio-album"
                    type="radio"
                    value="album"
                    checked={searchType === 'album'}
                    onChange={handleSearchType} />
                <label className={styles.radio} htmlFor="radio-album">album</label>

                <br />
                <button className={button2.button2} type="submit">Search</button>
            </form>
            {!userInput && (emptySearch)}
            {!userId && (loginMessage)}
        </div>
    );
};

export default SearchBar;