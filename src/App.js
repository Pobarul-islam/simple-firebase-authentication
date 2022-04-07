import React, { useState } from "react";
import "./App.css";
import { getAuth, GoogleAuthProvider, signInWithPopup,GithubAuthProvider, signOut } from "firebase/auth";
import app from "./firebase.init";
const auth = getAuth(app);
const App = () => {
  const [user, setUsers] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUsers(user);
        console.log(user);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUsers({});
      })
      .catch((error) => {
        setUsers({});
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const user = result.user;
      console.log(user)
    })
      .catch(error => {
      console.log(error)
    })
  };

  return (
    <div className="home">
      {user.email ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </div>
      )}

      <h2>Name: {user.displayName}</h2>
      <h5>I know Your Email Address: {user.email}</h5>
      <img src={user.photoURL} alt="" />
    </div>
  );
};

export default App;
