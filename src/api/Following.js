import { apiRequest } from './index';

const API = "https://uwssvll86d.execute-api.eu-west-1.amazonaws.com/dev";

export async function searchGetFollowing(querystring){
    try{
        const response = await apiRequest(`${API}/following${querystring}`, 'GET');
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getFollowing(username){
    try{
        const response = await apiRequest(`${API}/following/${username}`, 'GET');
        return response;
    } catch (error) {
        throw error;
    }
}

export async function createFollowingItem(body){
    try{
        const response = await apiRequest(`${API}/following`, 'POST', body);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function updateFollowing(user_id, body){
    try{
        const response = await apiRequest(`${API}/following/${user_id}`, 'PUT', body);
        return response;
    } catch (error) {
        throw error;
    }
}