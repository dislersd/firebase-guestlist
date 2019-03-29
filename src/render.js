import firebase from "firebase";
import _ from "lodash";
import {getGuests, getEvents, getUser} from "./lib";
import {loginButton, guestsHeading, eventsHeading, guestListItem, eventListItem} from "./components";

const clearNode = (node) => {
    while(node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

const renderGuests = (state) => {
    const guestsDiv = document.getElementById("guests-list");
    clearNode(guestsDiv);
    const heading = guestsHeading(state);
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
    clearNode(eventsDiv);
    const heading = eventsHeading(state);
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
        const btn = loginButton(state);
        userDiv.appendChild(btn);
    }
}

export {
    renderApp,
    renderEvents,
    renderGuests,
    renderUserInfo
}