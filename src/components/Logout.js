import React from "react";

function Logout({ setLoggedIn }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setLoggedIn(false); 
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;
