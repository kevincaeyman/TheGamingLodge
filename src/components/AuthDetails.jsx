import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthDetails = ({ handleLogout }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (authUser) {
    return (
      <div>
        <p>{`Signed in as ${authUser.email}`}</p>
        <button onClick={handleLogout}>Sign out</button>
      </div>
    );
  } else {
    return null;
  }
};

export default AuthDetails;
