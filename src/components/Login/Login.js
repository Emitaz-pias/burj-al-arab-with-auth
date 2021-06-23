import React, { useContext } from "react";
import { UserContext } from "../../App";
import { firebaseConfig } from "./firebase.config";
import firebase from "firebase/app";
import "firebase/auth";
import {
  BrowserRouter as Router,
  useHistory,
  useLocation,
} from "react-router-dom";
firebase.initializeApp(firebaseConfig);
const Login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleClick = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // const  credential = result.credential;
        // var token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const userInfo = { name: user.displayName, email: user.email };
        setLoggedInUser(userInfo);
        storeToken();
        history.replace(from);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const storeToken = () => {
    firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        // Send token to your backend via HTTPS
        sessionStorage.setItem("token", idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  };
  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handleClick}>Continue with google</button>
    </div>
  );
};

export default Login;
