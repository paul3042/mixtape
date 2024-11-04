import React, { useState } from "react";
import AudioPreview from "./AudioPreview";
import SaveToSpotify from "./SaveToSpotify";
import styles from "./Playlist.module.css";
import button2 from "./button2.module.css";


function Playlist({ className, userId, selectedTracks, setSelectedTracks,
    playlistTitle, setPlaylistTitle }) {
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

    const clearPlaylist = (e) => {
        e.preventDefault();
        setSelectedTracks([]);
    }

    return (
        <div className={`${className} ${styles.container}`}>
            <div>
                <h2>{playlistTitle}</h2>
                <form className={styles.renamePlaylist} onSubmit={handleSubmit}>
                    <input
                        id="playlist-title"
                        type="text"
                        placeholder="rename playlist"
                        value={userInput}
                        onChange={handleUserInput}
                    />
                    <br />
                    <button className={button2.button2} type="submit">Rename</button>
                </form>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.results}>
                    {selectedTracks.map((track) => (
                        <div className={styles.tracks} key={track.id}>
                            <h3>{track.name}</h3>
                            <p>{track.artist} | {track.album}</p>

                            <div className={styles.buttons}>
                                <button className={button2.button2} onClick={() => removeTrack(track)}>Remove</button>
                                <AudioPreview previewUrl={track.preview_url} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form>
                <button className={button2.button2} onClick={clearPlaylist}>Remove All</button>
                <SaveToSpotify
                    userId={userId}
                    selectedTracks={selectedTracks}
                    playlistTitle={playlistTitle} />
            </form>

        </div>
    );
}

export default Playlist;