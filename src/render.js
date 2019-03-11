import _ from "lodash";
import {getGuests} from "./lib";
import {guestListItem, eventListItem} from "./components";

const clearNode = node => {
    while(node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

const renderGuests = state => {
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