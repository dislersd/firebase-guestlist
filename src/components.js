import {getGuests} from "./lib";
import {renderGuests} from "./render";

const deleteButton = (state, guestId) => {
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
    item.setAttribute("class", "guest-list-item");
    item.appendChild(
        document.createElement("p")
        .appendChild(
            document.createTextNode(
                `${guest.lastName}, ${guest.firstName}`
            )
        )
    );
    item.appendChild(checkBox(state, guest, id));
    item.appendChild(deleteButton(state, id));
    
    return item;
}

const eventListItem = (state, event, id) => {
    const item = document.createElement("h4")
    item.
    appendChild(
        document.createTextNode(event.name)
    );
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