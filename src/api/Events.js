import { apiRequest } from './index';

const API = "https://do2v2vx79f.execute-api.eu-west-1.amazonaws.com/dev";

export async function getEvents() {
    try {
      const response = await apiRequest(`${API}/events`, 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  }

  export async function getQueryEvent(queryString) {
    try {
      const response = await apiRequest(`${API}/events${queryString}`, 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  }

  export async function getSearchEvents(queryString) {
    try {
      const response = await apiRequest(`${API}/events${queryString}`, 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  }


  export async function getEvent(eventId) {
    try {
      const response = await apiRequest(`${API}/events/${eventId}`, 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  export async function createEvent(body) {
    try {
      const response = await apiRequest(`${API}/events`, 'POST', body);
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  export async function updateEvent(eventId, body) {
    try {
      const response = await apiRequest(`${API}/events/${eventId}`, 'PUT', body);
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  export async function deleteEvent(eventId) {
    try {
      const response = await apiRequest(`${API}/events/${eventId}`, 'DELETE');
      return response;
    } catch (error) {
      throw error;
    }
  }
