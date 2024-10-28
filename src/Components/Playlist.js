import React, { useState } from "react";
import AudioPreview from "./AudioPreview";

function Playlist({ selectedTracks, setSelectedTracks, playlistTitle, setPlaylistTitle }) {
    const [userInput, setUserInput] = useState('');

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.length > 0) {
            setPlaylistTitle(userInput);
            setUserInput('');
        } else {
            setPlaylistTitle('Your Playlist');
        }
    }

    const removeTrack = (trackToRemove) => {
        setSelectedTracks((prevSelectedTracks) =>
            prevSelectedTracks.filter((track) =>
                track.id !== trackToRemove.id));
    }

    const clearPlaylist = () => {
        setSelectedTracks([]);
    }

    return (
        <>
            <h2>{playlistTitle}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    id="playlist-title"
                    type="text"
                    placeholder="rename playlist"
                    value={userInput}
                    onChange={handleUserInput}
                />
                <br />
                <button type="submit">Update</button>
                <div>
                    {selectedTracks.map((track) => (
                        <div key={track.id}>
                            <h4>{track.name}</h4>
                            <p>{track.artist} | {track.album}</p>
                            <button onClick={() => removeTrack(track)}>Remove</button>
                            <AudioPreview previewUrl={track.preview_url} />
                        </div>
                    ))}
                </div>
                <button onClick={clearPlaylist}>Remove All</button>
            </form>

        </>
    );
}

export default Playlist;