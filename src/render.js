import firebase from "firebase";
import _ from "lodash";
import {getGuests, getEvents, getUser} from "./lib";
import {guestListItem, eventListItem} from "./components";

const clearNode = (node) => {
    while(node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

const renderGuests = (state) => {
    const guestsDiv = document.getElementById("guests-list");
    const heading = document.createElement("h3");
    console.log(state.selectedEvent);
    const headerString = state.selectedEvent !== null ? `Guests: ${state.events[state.selectedEvent].name}` : "Guests";
    heading.appendChild(document.createTextNode(headerString));
    clearNode(guestsDiv);
    guestsDiv.appendChild(heading);
    if(_.isEmpty(state.guests)) {
        guestsDiv.appendChild(
            document.createTextNode("No guests for this event!")
        );
    } else {
        _.forEach(state.guests, (guest, id) => {
            guestsDiv.appendChild(
                guestListItem(state, guest, id)
            );
        })
    }
}

const renderEvents = (state) => {
    const eventsDiv = document.getElementById("events-list");
    const heading = document.createElement("h2");
    heading.appendChild(document.createTextNode("Events"));
    clearNode(eventsDiv);
    eventsDiv.appendChild(heading);
    _.forEach(state.events, (event, id) => {
        const item = eventListItem(state, event, id);
        eventsDiv.appendChild(item);
    });
}

const renderApp = (state, res) => {
    getUser(state, res.user, (user) => {
        state.user = user;
        state.signedIn = true;
        getEvents(state, (events) => {
            state.events = events;
            if(_.keys(state.events).indexOf(state.selectedEvent) < 0) {
                state.selectedEvent = null;
            }
            renderUserInfo(state);
            renderEvents(state);
        })
    }); 
}

const renderUserInfo = (state) => {
    const userDiv = document.getElementById("user-info");
    if(state.signedIn) {
        clearNode(userDiv);
        const userText = document.createElement("p");
        userText.appendChild(
            document.createTextNode(`Signed in as ${state.user.email}`)
        );
        userDiv.appendChild(userText);
    } else {
        const loginButton = document.createElement("button");
        loginButton.classList.add("primary");
        loginButton.appendChild(
            document.createTextNode("Log In")
        );
        loginButton.addEventListener("click", () => {
            // Create the Google Sign-in provider and fire the pop-up
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(authResult => {
                // After auth, we initialize the database and get the user's specific data
                // console.log(res);
                state.db = firebase.firestore();   
                renderApp(state, authResult);           
            })
            .catch(err => {
                console.error(err);
            });
        });
        userDiv.appendChild(loginButton);
    }
}

export {
    renderEvents,
    renderGuests,
    renderUserInfo
}