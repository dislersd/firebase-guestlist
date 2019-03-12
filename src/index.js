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

// Add form listeners


// We kick off by rendering the user info div: a login button