import { apiRequest } from './index';

const APP_API = "https://nv35eydsof.execute-api.eu-west-1.amazonaws.com/dev";
const EMAIL_API = "https://43ksppphnc.execute-api.eu-west-1.amazonaws.com/dev";

export async function getNotificationsForUser(username){
    try {
        const response = await apiRequest(`${APP_API}/app-notifications/${username}`, 'GET');
        return response;
      } catch (error) {
        throw error;
      }
}

export async function createNotificationItem(body){
    try {
        const response = await apiRequest(`${APP_API}/app-notifications`, 'POST', body);
        return response;
      } catch (error) {
        throw error;
      }
}

export async function newNotification(body){
    try {
        const response = await apiRequest(`${APP_API}/app-notifications/${body.username}`, 'PUT', body);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function newEventEmail(body){
    try{
        const response = await apiRequest(`${EMAIL_API}/event`, 'POST', body);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function newApplicationEmail(body){
    try{
        const response = await apiRequest(`${EMAIL_API}/application`, 'POST', body);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function welcomeEmail(body){
    try{
        const response = await apiRequest(`${EMAIL_API}/welcome`, 'POST', body);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function eventSelectionEmail(body){
    try{
        const response = await apiRequest(`${EMAIL_API}/selection`, 'POST', body);
        return response;
    } catch (error) {
        throw error;
    }
}