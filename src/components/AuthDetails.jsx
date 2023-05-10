import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthDetails = ({ handleLogout, showDetails }) => {
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

  return (
    <div>
      {showDetails && authUser && (
        <>
          <p>{`Signed in as ${authUser.email}`}</p>
          <button onClick={handleLogout}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default AuthDetails;
