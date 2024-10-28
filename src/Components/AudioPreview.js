import React, { useState, useEffect } from 'react';

function AudioPreview({ previewUrl }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        const newAudio = new Audio(previewUrl);
        setAudio(newAudio);
    }, [previewUrl]);

    const handlePlayPause = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }

            audio.onended = () => {
                setIsPlaying(false);
            };

            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            {previewUrl ? (
                <button onClick={handlePlayPause}>
                    {isPlaying ? 'Pause Preview' : 'Play Preview'}
                </button>
            ) : (
                <p>No preview available</p>
            )}
        </>
    );
}

export default AudioPreview;