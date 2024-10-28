import React, { useState, useEffect } from "react";

function SpotifyLogin({ setUserId }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const [tokenExpirationTime, setTokenExpirationTime] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const stateKey = 'spotify_auth_state';

    useEffect(() => {
        // Get Profile
        const getProfile = async (token) => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to fetch profile data: ${errorData.error.message}`);
                }

                const data = await response.json();
                setUserProfile(data);
                setUserId(data.id);
                setErrorMessage('');

            } catch (error) {
                console.error('Error ferching profile data', error);
                setErrorMessage('Failed to fetch profile data.')
            }
        };

        // Token Extraction
        const handleToken = async () => {
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.substring(1));
            const token = params.get('access_token');
            const expiresIn = params.get('expires_in');
            const returnedState = params.get('state');
            const storedState = localStorage.getItem(stateKey);

            // Validate State
            // Condition 1: triggers on first login attempt, with security (state) check
            try {
                if (token && expiresIn) {
                    if (storedState !== returnedState) {
                        console.error('States do not match. Possible CSRF attack.');
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('token_expiration_time');
                        localStorage.removeItem(stateKey);
                        setErrorMessage('Authentication failed. Please try again');
                        return;
                    }

                    const expirationTime = new Date().getTime() + expiresIn * 1000;
                    setAccessToken(token);
                    setTokenExpirationTime(expirationTime);
                    setErrorMessage('');

                    localStorage.setItem('access_token', token);
                    localStorage.setItem('token_expiration_time', expirationTime);

                    window.location.hash = '';

                    await getProfile(token);
                } else {
                    const savedToken = localStorage.getItem('access_token');
                    const savedExpirationTime = localStorage.getItem('token_expiration_time');

                    // Condition 2: if no token in URL, checks for previous login credentials 
                    if (savedToken && savedExpirationTime) {
                        const currentTime = new Date().getTime();
                        if (currentTime < savedExpirationTime) {
                            setAccessToken(savedToken);
                            setTokenExpirationTime(savedExpirationTime);
                            setErrorMessage('');

                            await getProfile(savedToken);
                        } else {
                            // Condition 3: remove expired credentials so process can start again
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('token_expiration_time');
                            setErrorMessage('Access token has expired. Please try again');
                        }
                    }
                }
            } catch (error) {
                console.error('Error handling token', error);
                setErrorMessage('Authentication error');
            }
        };
        handleToken();
    }, [setUserId]);

    // Authorisation
    const handleLogin = () => {
        // Generate Random String
        const generateRandomString = (length) => {
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let string = '';
            for (let i = 0; i < length; i++) {
                string += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return string;
        };

        const clientId = 'e9dcfcba91d74f3aa912153e71f0cd1d';
        const redirectUri = 'http://localhost:3000/'
        const state = generateRandomString(16);
        localStorage.setItem(stateKey, state);

        const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

        let url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(clientId);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirectUri);
        url += '&state=' + encodeURIComponent(state);

        window.location.href = url;
    };



    const handleSignOut = () => {
        setUserId('');
        setAccessToken(null);
        setTokenExpirationTime(null);
        setUserProfile(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_expiration_time');
        localStorage.removeItem('spotify_auth_state');
    };




    return (
        <>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {!accessToken && <button onClick={handleLogin}>Spotify Login</button>}
            {accessToken && (
                <>
                    <button onClick={handleSignOut}>Sign Out</button>
                    {userProfile ? (
                        <>
                            <p>Signed in as {userProfile.display_name}</p>
                            <p>Session expires at {new Date(parseInt(tokenExpirationTime)).toLocaleTimeString()}</p>
                        </>
                    ) : (
                        <p>Loading profile...</p>
                    )}
                </>)}
        </>
    )
}

export default SpotifyLogin;