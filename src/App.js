import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient"; 
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./components/Profile";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setLoggedIn(true);
      setUserId(userId);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <div>
        {loggedIn ? (
          <>
            <Logout setLoggedIn={setLoggedIn} />
            <Profile userId={userId} setUserId={setUserId} />
          </>
        ) : (
          <Login setLoggedIn={setLoggedIn} />
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;
