import _ from "lodash";
import {renderEvents, renderGuests} from "./render";

const addGuest = (e, state) => {
    event.preventDefault();
    console.log("Add Guest");
    const firstNameField = document.getElementById("new-guest-first");
    const lastNameField = document.getElementById("new-guest-last");
    const emailField = document.getElementById("new-guest-email");
    state.db.collection(`users/${state.user.uid}/events/${state.selectedEvent}/guests`)
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

const addEvent = (e, state) => {
    event.preventDefault();
    console.log("Add Event");
    const eventNameField = document.getElementById("new-event-name");
    state.db.collection(`users/${state.user.uid}/events`)
    .add({
        name: eventNameField.value
    })
    .then( () => {
        console.log(`Added ${eventNameField.value}`);
        eventNameField.value = "";
    });
}

const getUser = (state, user, callback) => {
    state.db.collection("users")
    .doc(user.uid)
    .set({
        email: user.email
    })
    .then( () => {
        state.db.collection("users")
        .doc(user.uid)
        .onSnapshot(snapshot => {
                let record = snapshot.data();
                record.uid = user.uid;
                callback(record);
            }
        )
    });
    
}

const getEvents = (state, callback) => {
    const id = state.user.uid;
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
    state.db.collection(`users/${state.user.uid}/events/${eventId}/guests`)
    .onSnapshot(snapshot => {
        let guests = {};
        if(snapshot.empty) { 
            console.log("EMPTY GUESTLIST");
            return callback(guests); 
        }
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
    addGuest,
    addEvent
}