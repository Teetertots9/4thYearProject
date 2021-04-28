import { getIdToken } from './userAuth';

export const apiRequest = async (url, method, body, disableAuth) => {
  try {
    const response = await fetch(url,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: disableAuth ? null : await getIdToken()
        },
        body: JSON.stringify(body),
      });
    if (response.status === 200) {
      return response.json();
    } if (response.status === 404) {
      return {};
    }
    throw Error(`${response.status} ${response.statusText}`);
  } catch (error) {
    throw error;
  }
};

export default apiRequest;
