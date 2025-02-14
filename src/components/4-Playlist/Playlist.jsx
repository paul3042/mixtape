import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPlaylist, clearPlaylist } from "../../redux/playlistSlice";
import SaveToSpotify from "./SaveToSpotify";
import PlayAll from "./PlayAll";
import styles from './Playlist.module.scss';
import buttons from '../../styles/buttons.module.scss';

function Playlist({ className }) {
    const [userInput, setUserInput] = useState('');
    const [playlistName, setPlaylistName] = useState('Your Playlist');
    const [playlistMessage, setPlaylistMessage] = useState(null);
    const [listId, setListId] = useState(null)

    const playlist = useSelector((state) => state.playlist);
    const dispatch = useDispatch();

    const handleRemoveTrack = (track) => {
        dispatch(removeFromPlaylist(track))
    }

    const handleRemoveAll = () => {
        setPlaylistMessage(null);
        dispatch(clearPlaylist());
    }

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }

    const handleRename = (e) => {
        setPlaylistMessage(null);
        e.preventDefault();
        if (userInput.length !== 0) {
            setPlaylistName(userInput);
            setUserInput('')
        } else {
            setPlaylistName('Your Playlist');
        }
    }

    return (
        <>
            <div className={`${className} ${styles.main}`}>
                <h2>{playlistName}</h2>
                <form className={styles.renamePlaylist} onSubmit={handleRename}>
                    <input
                        id="playlist-title"
                        type="text"
                        placeholder="rename playlist"
                        value={userInput}
                        onChange={handleUserInput}
                    />
                    <br />
                    <button className={buttons.button2} type="submit">Rename</button>
                </form>
                <div className={styles.container}>
                    <div className={styles.results}>

                        {playlist.length !== 0 && playlist.map(track => (
                            <div className={styles.tracks} key={track.id}>
                                <img src={track.image_url} />
                                <div>
                                    <iframe className={styles.iframe}
                                        src={`https://open.spotify.com/embed/track/${track.id}`}
                                        allowtransparency="true"
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                        loading="lazy"
                                    />
                                </div>
                                <div className={styles.addOrRemoveTrack}>
                                    <p>Remove <i>{track.name}</i> from playlist?</p>
                                    <button className={buttons.button2} onClick={() => handleRemoveTrack(track)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {playlistMessage && playlistMessage}
                <div className={styles.btns}>
                    <button className={buttons.button2} onClick={handleRemoveAll}>Remove All</button>
                    <SaveToSpotify
                        playlistName={playlistName}
                        setPlaylistMessage={setPlaylistMessage}
                        setListId={setListId}
                    />
                    <PlayAll
                        playlistName={playlistName}
                        setPlaylistMessage={setPlaylistMessage}
                        listId={listId}
                    />
                </div>
            </div>
        </>
    );
}

export default Playlist;
