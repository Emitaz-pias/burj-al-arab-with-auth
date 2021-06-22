import React, { useContext } from "react";
import { UserContext } from "../../App";
import { firebaseConfig } from "./firebase.config";
import firebase from "firebase/app";

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      // const  credential = result.credential;
      // var token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      setLoggedInUser(user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.

      const errorMessage = error.message;
      console.log(errorMessage);
    });

  return (
    <div>
      <h1>This is Login</h1>
    </div>
  );
};

export default Login;
