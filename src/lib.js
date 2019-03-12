import _ from "lodash";
import {renderEvents, renderGuests} from "./render";

const addGuest = (e, state) => {
    event.preventDefault();
    console.log("Add Guest");
    // Get form fields
    // Use values to add to DB
    // Reset form values
}

const addEvent = (e, state) => {
    event.preventDefault();
    console.log("Add Event");
    // Get event name field
    // Add event to user's collection
    // Reset field value
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

const getGuests = (state, eventId, callback) => {
    console.log("Get Guests");
    // Set real-time updates on users/uid/events/eventId/guests
    // Build guests object of id: value
    // Return it empty if it's empty
    // Otherwise, loop through the object
    // callback the guests object
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