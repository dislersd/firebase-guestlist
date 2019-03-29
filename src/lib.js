import _ from "lodash";
import {renderEvents, renderGuests} from "./render";

const login = (state) => {
    // Create the Google Sign-in provider and fire the pop-up
    const provider = new firebase.auth.GoogleAuthProvider();
    // Trigger the Google popup signin
    // Callback with the result, attaching to state
}

const addGuest = (e, state) => {
    event.preventDefault();
    console.log("Add Guest");
    // Get form fields
    // Use values to add to DB
    // Reset form values
}

const deleteGuest = (state, guestId) => {
    const path = `users/${state.user.uid}/events/${state.selectedEvent}/guests`;
    // Delete document from the correct path
}

const addEvent = (e, state) => {
    event.preventDefault();
    console.log("Add Event");
    // Get event name field
    // Add event to user's collection
    // Reset field value
}

const deleteEvent = (state, eventId) => {
    const path = `users/${state.user.uid}/events`;
    // Delete document from the correct path
}

const getUser = (state, user, callback) => {
    console.log("Get User");
    // set users/uid to email
    // Then, set real-time updates on the same document
    // callback that record
}

const getEvents = (state, callback) => {
    console.log("Get Events");
    // Set real-time updates on users/uid/events
    // Build events object of id: value
    // Callback the events object
}

const selectEvent = (state, id) => {
    // Set state.selectedEvent
    // Trigger getGuests 
    // Callback attaching guests to state
    // Trigger renderGuests
}

const getGuests = (state, eventId, callback) => {
    console.log("Get Guests");
    // Set real-time updates on users/uid/events/eventId/guests
    // Build guests object of id: value
    // Return it empty if it's empty
    // Otherwise, loop through the object
    // callback the guests object
}

const checkIn = (state, guest, id) => {
    const path = `users/${state.user.uid}/events/${state.selectedEvent}/guests`;
    // Toggle arrived for correct document
}
    
export {
    getUser,
    getEvents,
    getGuests,
    addGuest,
    addEvent
}