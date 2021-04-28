import { getEvents, deleteEvent } from '../api/Events';
import { getApplications, deleteApplication } from '../api/Applications';

export async function adminFetchEvents(){
    try {
        const events = await getEvents();
        return events.Items;
    } catch (error) {
        console.log(error);
    }
}

export async function adminFetchApplications(){
    try {
        const applications = await getApplications();
        return applications.Items;
    } catch (error) {
        console.log(error);
    }
}

export async function adminDeleteEvent(eventId){
    try{
        await deleteEvent(eventId);
    } catch (error) {
        console.log(error);
    }
}

export async function adminDeleteApplication(applicationId){
    try{
        await deleteApplication(applicationId);
    } catch (error) {
        console.log(error);
    }
}