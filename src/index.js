import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCvuuUPsLkdSHEnqx-jB1a_vQd4Pfhjyr8",
    authDomain: "music-of-legends.firebaseapp.com",
    databaseURL: "https://music-of-legends.firebaseio.com",
    projectId: "music-of-legends",
    storageBucket: "music-of-legends.appspot.com",
    messagingSenderId: "283576209456",
    appId: "1:283576209456:web:cc741829cbf1d05b58ddf5",
    measurementId: "G-H5K4HVT5E4"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

