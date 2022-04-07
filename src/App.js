import React, { useState } from 'react';
import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase.init';
const auth = getAuth(app);
const App = () => {
  const [user, setUsers] = useState({});
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      setUsers(user);
      console.log(user);
    })
      .catch(error => {
        console.error('error', error);
    })
  }

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUsers({});
      })
      .catch((error) => {
        setUsers({});

      });
  }
  return (
    <div className='home'>
      { 
        user.email ?<button onClick={handleSignOut}>Sign out</button> 
          :

      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    }

      <h2>Name: {user.displayName}</h2>
      <h5>I know Your Email Address: {user.email}</h5>
      <img src={user.photoURL} alt="" />
    </div>
  );
};

export default App;