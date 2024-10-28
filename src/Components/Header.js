import React from "react";
import SpotifyLogin from "./SpotifyLogin";

function Header({className, setUserId, setTokenErrorMessage, accessToken, 
    setAccessToken, setTokenExpirationTime }) {
    return (
        <div className={className}>
        <h1>mixtape</h1>
        <SpotifyLogin
             setUserId={setUserId}
             setTokenErrorMessage={setTokenErrorMessage}
             accessToken={accessToken}
             setAccessToken={setAccessToken}
             setTokenExpirationTime={setTokenExpirationTime} />
        </div>
    );
}

export default Header;