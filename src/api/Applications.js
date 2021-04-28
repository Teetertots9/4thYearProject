import { apiRequest } from './index';

const API = "https://nzaz46iujc.execute-api.eu-west-1.amazonaws.com/dev";

export async function getApplications() {
    try {
      const response = await apiRequest(`${API}/applications`, 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  }

  export async function getQueryApplications(queryString) {
    try {
      const response = await apiRequest(`${API}/applications${queryString}`, 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  }

  export async function getApplication(applicationId) {
    try {
      const response = await apiRequest(`${API}/applications/${applicationId}`, 'GET');
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  export async function createApplication(body) {
    try {
      const response = await apiRequest(`${API}/applications`, 'POST', body);
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  export async function updateApplication(applicationId, body) {
    try {
      const response = await apiRequest(`${API}/applications/${applicationId}`, 'PUT', body);
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  export async function deleteApplication(applicationId) {
    try {
      const response = await apiRequest(`${API}/applications/${applicationId}`, 'DELETE');
      return response;
    } catch (error) {
      throw error;
    }
  }
