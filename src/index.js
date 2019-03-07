import firebase from "firebase";
import config from "./config";
import {getUser, getEvents, renderEvents, addGuest} from "./lib";

const state = {
    db: null,
    user: null,
    events: {},
    selectedEvent: null,
    signedIn: false,
    guests: {}
}

// We start by initializing the Firebase App
firebase.initializeApp(config);

// Create the Google Sign-in provider and fire the pop-up
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider)
.then(res => {
    // After auth, we initialize the database and get the user's specific data
    // console.log(res);
    state.db = firebase.firestore();
    getUser(state, res.user.email, (user) => {
        state.user = user;
        state.signedIn = true;
        getEvents(state, (events) => {
            state.events = events;
            renderEvents(state);
        })
    }); 
})
.catch(err => {
    console.error(err);
});

document.getElementById("add-guest").addEventListener("submit", (e) => addGuest(e, state));

