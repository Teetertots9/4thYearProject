import Auth from '@aws-amplify/auth';

function getIdToken() {
  return new Promise((resolve, reject) => Auth.currentSession()
    .then((session) => {
      resolve(session.idToken.jwtToken);
    })
    .catch((error) => {
      reject(error);
    }));
}

function getIdTokenPayload() {
  return new Promise((resolve, reject) => Auth.currentSession()
    .then((session) => {
      resolve(session.idToken);
    })
    .catch((error) => {
      reject(error);
    }));
}

export {
  getIdToken,
  getIdTokenPayload,
};
