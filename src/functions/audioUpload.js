import Auth from '@aws-amplify/auth';
const AWS = require('aws-sdk');
const FileType = require('file-type/browser');
const binary = require('bops');

const albumBucketName = 'seobooker-mp3';

const urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const urlRegex = new RegExp(urlExpression);

const isUrl = (audio) => String(audio).match(urlRegex);

async function GetCredentials() {
  const res = await Auth.currentSession();
  const idToken = res.getIdToken();
  const jwt = idToken.getJwtToken();

  const Logins = {};
  Logins[`cognito-idp.eu-west-1.amazonaws.com/eu-west-1_byuIDXxNM`] = jwt;
  AWS.config.update({
    region: 'eu-west-1',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-west-1:75e39a58-d853-4962-9f61-512309113cc8',
      Logins
    })
  });
  //await AWS.config.credentials.getPromise();
}

async function uploadAudio(audio, filename, folder) {
  if (isUrl(audio)) {
    // if image is a url dont upload
    return audio;
  }
  await GetCredentials();
  const s3 = new AWS.S3();
  const buffer = binary.from(audio, 'base64');
  const audioKey = `${folder}/${filename}`;

  const params = {
    Bucket: albumBucketName,
    Key: audioKey,
    Body: buffer
  };

  await s3.upload(params).promise();

  const url = `https://seobooker-mp3.s3-eu-west-1.amazonaws.com/${audioKey}`;
  return url;
}

export async function uploadApplicationAudio(audio, filename) {
  const folder = 'application-Audio';
  if (!audio) {
    return alert('Please choose a file to upload first.');
  }
  const url = await uploadAudio(audio, filename, folder);
  return url;
}