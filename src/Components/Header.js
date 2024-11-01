import React from "react";
import SpotifyLogin from "./SpotifyLogin";
import styles from "./Header.module.css";

function Header({ className, setUserId, setTokenErrorMessage, accessToken,
    setAccessToken, setTokenExpirationTime }) {
    return (
        <div className={`${className} ${styles.div}`}>
            <h1 className={styles.header}>mixtape</h1>
            <SpotifyLogin
                className={styles.login}
                setUserId={setUserId}
                setTokenErrorMessage={setTokenErrorMessage}
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                setTokenExpirationTime={setTokenExpirationTime} />
        </div>
    );
}

export default Header;