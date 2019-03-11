import firebase from "firebase";
import _ from "lodash";
import config from "./config";
import {getUser, getEvents, renderEvents, addGuest, addEvent} from "./lib";

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
    getUser(state, res.user, (user) => {
        state.user = user;
        state.signedIn = true;
        getEvents(state, (events) => {
            state.events = events;
            if(_.keys(state.events).indexOf(state.selectedEvent) < 0) {
                state.selectedEvent = null;
            }
            renderEvents(state);
        })
    }); 
})
.catch(err => {
    console.error(err);
});

// Add form listeners
document.getElementById("add-guest")
.addEventListener("submit", e => addGuest(e, state));

document.getElementById("add-event")
.addEventListener("submit", e => addEvent(e, state));

