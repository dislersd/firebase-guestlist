import _ from "lodash";
import {getGuests} from "./lib";
import {guestListItem, eventListItem} from "./components";

const clearNode = node => {
    while(node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

const renderGuests = state => {
    console.log(state.guests);
    const guestsDiv = document.getElementById("guests-list");
    const heading = document.createElement("h3");
    heading.appendChild(document.createTextNode("Guests"));
    clearNode(guestsDiv);
    guestsDiv.appendChild(heading);
    _.forEach(state.guests, (guest, id) => {
        guestsDiv.appendChild(
            guestListItem(state, guest, id)
        );
    })
}

const renderEvents = state => {
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

export {
    renderEvents,
    renderGuests
}