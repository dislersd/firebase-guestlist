import firebase from "firebase";
import _ from "lodash";
import config from "./config";
import {addGuest, addEvent} from "./lib";
import { renderUserInfo } from "./render";

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

// Add form listeners
document.getElementById("add-guest")
.addEventListener("submit", e => addGuest(e, state));

document.getElementById("add-event")
.addEventListener("submit", e => addEvent(e, state));

// We kick off by rendering the user info div: a login button
renderUserInfo(state);
