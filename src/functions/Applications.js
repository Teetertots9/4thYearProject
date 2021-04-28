import { getApplications, createApplication, updateApplication, getQueryApplications } from '../api/Applications';

    export async function fetchApplications(){
        try {
            const applications = await getApplications();
            return applications;
        } catch (error) {
            console.log(error);
        }
    }

    export async function getEventsForArtist(artistId){
        try{
            const queryString = `?artistId=${artistId}`;
            const response = await getQueryApplications(queryString);
            const events = [];
            console.log(response);
            if(response.Items.length > 0){
                for (var i = 0; i < response.Items.length; i++){
                    events.push(response.Items[i].event);
                }
            }
            return events;
        } catch (error) {
            console.log(error);
        }
    }

    export async function createNewApplication(application, eventId, artistId){
        const { artistName, applicationHook, artistImage, soundFile, soundFileName, createdBy } = application;
        try {
            const newApplication = {
                eventId,
                artistName,
                artistImage,
                applicationHook,
                artistId,
                createdBy,
                soundFile,
                soundFileName
            };
            const response = await createApplication(application)
            if (response.errorMessage) {
                throw new Error(response.errorMessage);
              }
            return response.Item;
        } catch (error) {
            console.error(error);
        }
    }

    export async function callUpdateApplication(application, applicationId){
        try {
            const response = await updateApplication(applicationId, application);
            if (response.errorMessage) {
                throw new Error(response.errorMessage);
              }
            return response.Item;
        } catch (error) {
            console.error(error);
        }
    }