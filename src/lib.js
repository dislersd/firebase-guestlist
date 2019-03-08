import _ from "lodash";
import {renderEvents, renderGuests} from "./render";

const addGuest = (e, state) => {
    event.preventDefault();
    console.log("Add Guest");
    const firstNameField = document.getElementById("new-guest-first");
    const lastNameField = document.getElementById("new-guest-last");
    const emailField = document.getElementById("new-guest-email");
    state.db.collection(`users/${state.user.id}/events/${state.selectedEvent}/guests`)
    .add({
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        email: emailField.value,
        arrived: false
    })
    .then( () => {
        console.log(`Added ${emailField.value}`);
        firstNameField.value = "";
        lastNameField.value = "";
        emailField.value = "";
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