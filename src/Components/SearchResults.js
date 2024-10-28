import React from "react";
import AudioPreview from "./AudioPreview";

function SearchResults({ className, tracks, searchErrorMessage,
    selectedTracks, setSelectedTracks, searchSubmitted }) {

    const selectTrack = (track) => {
        if (!selectedTracks.find(tracks => tracks.id === track.id)) {
            setSelectedTracks((prevSelectedTracks => [...prevSelectedTracks, track]))
        }
    };

    return (
        <div className={className}>
            <h2>Search Results</h2>
            {searchErrorMessage ? (
                <p>{searchErrorMessage}</p>
            ) : (
                <div>
                    {searchSubmitted && tracks.length === 0 ? <p>No results</p> : (
                        tracks.map(track => (
                            <div key={track.id}>
                                <h4>{track.name}</h4>
                                <p>{track.artist} | {track.album}</p>
                                <button onClick={() => selectTrack(track)}>Add</button>
                                <AudioPreview previewUrl={track.preview_url} />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchResults;