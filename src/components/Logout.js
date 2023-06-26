import React from "react";
import './Logout.css'; 

function Logout({ setLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
