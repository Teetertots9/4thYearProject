import {newEventEmail, newApplicationEmail, welcomeEmail, eventSelectionEmail} from '../api/Notification';
import {getFollowing} from '../api/Following';

export async function getEmails(artistId, venueId){
    try {
        const artist = await getFollowing(artistId);
        const venue = await getFollowing(venueId);
        let emails = [];
        if(artist && venue && artist.user_followers && venue.user_followers){
            emails = [...artist.user_followers, ...venue.user_followers];
        } else if(artist && artist.user_followers){
            emails = artist.user_followers;
        }
        else if(venue && venue.user_followers){
            emails = venue.user_followers;
        }
        return emails;
    } catch (error) {
        console.log(error);
    }
}

//Not working as expected will have to move the majority of code to backend
export async function sendNewEventEmail(body, venueId, artistId){
    try{
            body.emails = await getEmails(artistId, venueId);
            const response = newEventEmail(body);
            return response;
    } catch (error) {
        console.log(error);
    }
}

export async function sendNewApplicationEmail(body){
    try {
        const response = newApplicationEmail(body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function sendWelcomeEmail(body){
    try {
        const response = welcomeEmail(body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function sendEventSelectionEmail(body){
    try {
        const response = eventSelectionEmail(body);
        return response;
    } catch (error) {
        console.log(error);
    }
}