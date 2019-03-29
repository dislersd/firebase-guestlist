import {login, getGuests, checkIn} from "./lib";
import {renderGuests, renderApp} from "./render";

const iconElement = (icon) => {
    const iconEl = document.createElement("i");
    iconEl.classList.add("material-icons");
    iconEl.appendChild(
        document.createTextNode(icon)
    );
    return iconEl;
}

const loginButton = (state) => {
    const btn = document.createElement("button");
    btn.classList.add("primary");
    btn.appendChild(
        document.createTextNode("Log In")
    );
    btn.addEventListener("click", () => {
        login(state);
    });
    return btn;
}

const mailButton = (guest) => {
    const link = document.createElement("a");
    link.setAttribute("href", `mailto:${guest.email}`);
    const btn = document.createElement("button");
    btn.classList.add("primary");
    btn.setAttribute("type","button");
    const iconEl = document.createElement("i");
    iconEl.classList.add("material-icons");
    iconEl.appendChild(
        document.createTextNode("email")
    );
    btn.appendChild(iconEl);
    link.appendChild(btn);
    return link;
}

const guestsHeading = (state) => {
    const heading = document.createElement("h3");
    const headerString = state.selectedEvent !== null ? `Guests: ${state.events[state.selectedEvent].name}` : "Guests";
    heading.appendChild(document.createTextNode(headerString));
    return heading;
}

const deleteGuestButton = (state, guestId) => {
    const btn = document.createElement("button");
    
    btn.classList.add("warning")
    btn.appendChild(iconElement("delete"));
    btn.addEventListener("click", () => {
        state.db.collection(`users/${state.user.uid}/events/${state.selectedEvent}/guests`)
        .doc(guestId)
        .delete();
    });
    return btn;
}

const deleteEventButton = (state, eventId) => {
    const btn = document.createElement("button");
    btn.classList.add("warning");
    btn.appendChild(iconElement("delete"));
    btn.addEventListener("click", () => {
        state.db.collection(`users/${state.user.uid}/events`)
        .doc(eventId)
        .delete();
    });
    return btn;
}

const checkBox = (state, guest, id) => {
    const cb = document.createElement("input");
    cb.setAttribute("type","checkbox");
    cb.id = id;
    cb.checked = guest.arrived;
    cb.addEventListener("change", () => {
        checkIn(state, guest, id);
    });
    return cb;
}

const guestListItem = (state, guest, id) => {
    const item = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for",id);
    item.classList.add("list-item");
    label.appendChild(
        document.createTextNode(`${guest.lastName}, ${guest.firstName}`)
    );
    item.appendChild(label);
    item.appendChild(checkBox(state, guest, id));
    item.appendChild(mailButton(guest));
    item.appendChild(deleteGuestButton(state, id));
    return item;
}

const eventsHeading = (state) => {
    const heading = document.createElement("h2");
    heading.appendChild(document.createTextNode("Events"));
    return heading;
}

const eventListItem = (state, event, id) => {
    const item = document.createElement("div");
    item.classList.add("list-item");
    const heading = document.createElement("h4");
    heading.
    appendChild(
        document.createTextNode(event.name)
    );
    item.appendChild(heading);
    item.appendChild(deleteEventButton(state, id));
    item.addEventListener("click", () => {
        state.selectedEvent = id;
        getGuests(state, id, guests => {
            state.guests = guests;
            renderGuests(state);
        });
    });
    return item;
}

export {
    loginButton,
    guestsHeading,
    eventsHeading,
    guestListItem,
    eventListItem 
}