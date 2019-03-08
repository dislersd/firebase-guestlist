import {getGuests} from "./lib";
import {renderGuests} from "./render";

const deleteGuestButton = (state, guestId) => {
    const btn = document.createElement("button");
    btn.appendChild(
        document.createTextNode("x")
    );
    btn.addEventListener("click", () => {
        state.db.collection(`users/${state.user.id}/events/${state.selectedEvent}/guests`)
        .doc(guestId)
        .delete();
    });
    return btn;
}

const deleteEventButton = (state, eventId) => {
    const btn = document.createElement("button");
    btn.appendChild(
        document.createTextNode("x")
    );
    btn.addEventListener("click", () => {
        state.db.collection(`users/${state.user.id}/events`)
        .doc(eventId)
        .delete();
    });
    return btn;
}

const checkBox = (state, guest, id) => {
    const cb = document.createElement("input");
    cb.setAttribute("type","checkbox");
    cb.checked = guest.arrived;
    cb.addEventListener("change", () => {
        const path = `users/${state.user.id}/events/${state.selectedEvent}/guests`;
        console.log(path);
        state.db.collection(path)
        .doc(id)
        .set({
            arrived: !guest.arrived
        }, {merge: true});
    });
    return cb;
}

const guestListItem = (state, guest, id) => {
    const item = document.createElement("div");
    const heading = document.createElement("h5");
    item.classList.add("list-item");
    heading.appendChild(
        document.createTextNode(`${guest.lastName}, ${guest.firstName}`)
    );
    item.appendChild(heading);
    item.appendChild(checkBox(state, guest, id));
    item.appendChild(deleteGuestButton(state, id));
    
    return item;
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
    guestListItem,
    eventListItem 
}