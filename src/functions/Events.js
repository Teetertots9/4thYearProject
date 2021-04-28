import { getEvents, createEvent, updateEvent, getSearchEvents, getQueryEvent } from '../api/Events';
import { replaceSpecial} from './strings';

    export async function fetchEvents(){
        try {
            const events = await getEvents();
            return events.Items;
        } catch (error) {
            console.log(error);
        }
    };

    export async function callSearchEvents(queryString){
        try {
            const events = await getSearchEvents(queryString);
            return events.Items;
        } catch (error) {
            console.log(error);
        }
    };

    export async function getVenueEvents(venueId){
        try{
            const queryString = `?createdBy=${venueId}`;
            const events = await getQueryEvent(queryString);
            return events.Items;
        } catch (error) {
            console.log(error);
        }
    }

    export async function getArtistEvents(artistId){
        try{
            const queryString = `?artistId=${artistId}`;
            const events = await getQueryEvent(queryString);
            return events.Items;
        } catch (error) {
            console.log(error);
        }
    }

    export async function createNewEvent(event){
        const {venueName, venueLocation, eventDateTime, sortDate, eventDescription, createdBy, eventImage } = event;
        try {
            const newEvent = {
                venueName,
                eventImage,
                venueLocation,
                eventDateTime,
                sortDate,
                eventDescription,
                venueSearchName : replaceSpecial(venueName.toLowerCase()),
                createdBy,
                applications: []
            };
            const response = await createEvent(newEvent)
            if (response.errorMessage) {
                throw new Error(response.errorMessage);
              }
            console.log(response);
            return response.Item;
        } catch (error) {
            console.error(error);
        }
    };

    export async function createAcceptedEvent(event, application){
        const {eventDateTime, eventDescription, sortDate, venueName, venueLocation, eventImage} = event;
        const { artistName, artistId } = application;
        try{
            const acceptedEvent = {
                eventDateTime,
                artistId,
                eventImage,
                eventDescription, 
                sortDate, 
                venueName, 
                venueSearchName : replaceSpecial(venueName.toLowerCase()),
                venueLocation,
                artistName,
                artistSearchName : replaceSpecial(artistName.toLowerCase())
            };
            const response = await updateEvent(event.eventId, acceptedEvent);
            console.log(response);
            return response.Attributes;
        } catch (error) {
            console.log(error);
        }
    }

    export async function updateEmptyEvent(event, eventId){
        try{
            const response = await updateEvent(eventId, event);
            console.log(response);
            return response.Attributes;
        } catch (error) {
            console.log(error);
        }
    }

    export function updateEventState(events, application){
        
        for ( var i = 0; i < events; i++){
            if(events[i].eventsId === application.eventId){
                events[i].applications.push(application);
            }
        }
        return events;
    };