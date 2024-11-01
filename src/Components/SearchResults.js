import React from "react";
import AudioPreview from "./AudioPreview";
import button2 from "./button2.module.css";
import styles from "./SearchResults.module.css";

function SearchResults({ className, tracks, searchErrorMessage,
    selectedTracks, setSelectedTracks, searchSubmitted }) {

    const selectTrack = (track) => {
        if (!selectedTracks.find(tracks => tracks.id === track.id)) {
            setSelectedTracks((prevSelectedTracks => [...prevSelectedTracks, track]))
        }
    };

    return (
        <div className={`${className} ${styles.container}`}>
            <h2>Search Results</h2>
            <div className={styles.subContainer}>
                <div className={styles.results}>
                    {searchErrorMessage ? (
                        <p>{searchErrorMessage}</p>
                    ) : (
                        <div>
                            {searchSubmitted && tracks.length === 0 ? <p>No results</p> : (
                                tracks.map(track => (
                                    <div className={styles.tracks} key={track.id}>
                                        <h3>{track.name}</h3>
                                        <p>{track.artist} | <i>{track.album}</i></p>
                                        <div className={styles.buttons}>
                                            <button className={button2.button2} onClick={() => selectTrack(track)}>Add</button>
                                            <AudioPreview previewUrl={track.preview_url} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchResults;