import _ from "lodash";
import {renderEvents, renderGuests} from "./render";

const addGuest = (e, state) => {
    event.preventDefault();
    console.log("Add Guest");
    const firstName = document.getElementById("new-guest-first").value;
    const lastName = document.getElementById("new-guest-last").value;
    const email = document.getElementById("new-guest-email").value;
    state.db.collection(`users/${state.user.id}/events/${state.selectedEvent}/guests`)
    .add({
        firstName,
        lastName,
        email,
        arrived: false
    })
    .then( () => {
        console.log(`Added ${email}`);
    });
}

const getUser = (state, email, callback) => {
    state.db.collection("users")
    .where("email", "==", email)
    .onSnapshot(snapshot => {
            snapshot.forEach(record => {
                return callback(record);  // Yeah it's a loop but we only need the first one               
            })
        }
    )
}

const getEvents = (state, callback) => {
    const id = state.user.id;
    state.db.collection(`users/${id}/events`)
    .onSnapshot(snapshot => {
        let events = {};
        snapshot.forEach(record => {
            events[record.id] = record.data();
        });
        return callback(events);
    });
}

const getGuests = (state, eventId, callback) => {
    state.db.collection(`users/${state.user.id}/events/${eventId}/guests`)
    .onSnapshot(snapshot => {
        let guests = {};
        snapshot.forEach(record => {
            guests[record.id] = record.data();
            return callback(guests);
        });
    });
}


    
export {
    getUser,
    getEvents,
    getGuests,
    renderEvents,
    renderGuests,
    addGuest
}