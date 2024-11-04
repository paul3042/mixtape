
import React, { useState } from "react";
import button from "./button.module.css";

function SaveToSpotify({ userId, selectedTracks, playlistTitle }) {
    const [progressMessage, setProgressMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const accessToken = localStorage.getItem('access_token');

    const createPlaylist = async (personalId, title) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${personalId}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: title,
                    public: false,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error details:', errorResponse);
                throw new Error('Failed to create playlist');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Playlist creation error', error);
            throw error;
        }

    };

    const addTracksToPlaylist = async (title, trackUris) => {

        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${title}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uris: trackUris,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error details:', errorResponse);
                throw new Error('Failed to add tracks to playlist');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Add tracks error', error);
            throw error;
        }
    };

    const handleCreatePlaylist = async (personalId, title, tracks) => {
        setLoginMessage('');
        setProgressMessage('');
        if (!userId) {
            setLoginMessage('Please Login')
        } else if (tracks.length === 0) {
            setProgressMessage('Please add some songs');
            return;
        } else {
            setProgressMessage('Creating playlist...');
            try {
                const playlist = await createPlaylist(personalId, title);
                const trackUris = tracks.map(track => track.uri);
                await addTracksToPlaylist(playlist.id, trackUris);
                setProgressMessage('Playlist created succesfully!');
            } catch (error) {
                console.error('Error:', error)
                setProgressMessage('Playlist creation unsuccessful.')
            }
        }

    };

    return (
        <>
            <button
                className={button.button}
                onClick={(e) => {
                    e.preventDefault();
                    handleCreatePlaylist(userId, playlistTitle, selectedTracks);
                }}
            >
                Save Playlist
            </button>
            <p>{progressMessage}</p>
            <p>{loginMessage}</p>
        </>
    );
}

export default SaveToSpotify;