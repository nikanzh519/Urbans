import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

// 1. Replace these values with your Firebase project's config!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const GoogleLogin = () => {
  const [user, setUser] = useState(null);

  // Listen for login/logout events
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Sign in with Google popup
  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // User signed in!
        setUser(result.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // Sign out
  const handleLogout = () => {
    firebase.auth().signOut();
    setUser(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Login with Google</h2>
      {!user ? (
        <button 
          onClick={handleLogin}
          style={{
            fontSize: "18px",
            padding: "10px 20px",
            background: "#4285F4",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Sign in with Google
        </button>
      ) : (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <img 
            src={user.photoURL} 
            alt="Profile"
            style={{ borderRadius: "50%", width: "80px", height: "80px" }}
          />
          <div>
            <button 
              onClick={handleLogout}
              style={{
                marginTop: "20px",
                fontSize: "16px",
                padding: "8px 16px",
                background: "#db4437",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleLogin;
