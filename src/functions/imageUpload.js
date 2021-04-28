import Auth from '@aws-amplify/auth';
const AWS = require('aws-sdk');
const fileType = require('file-type/browser');
const binary = require('bops');

const albumBucketName = 'seobooker-images';

const urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const urlRegex = new RegExp(urlExpression);

const isUrl = (image) => image.match(urlRegex);

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

async function UploadImage(image, filename, folder) {
  if (isUrl(image)) {
    // if image is a url dont upload
    return image;
  }
  await GetCredentials();
  const s3 = new AWS.S3();
  const buffer = binary.from(image, 'base64');
  const photoKey = `${folder}/${filename}`;

  const params = {
    Bucket: albumBucketName,
    Key: photoKey,
    Body: buffer
  };

  await s3.upload(params).promise();

  const url = `https://seobooker-images.s3-eu-west-1.amazonaws.com/${photoKey}`;
  return url;
}

export async function uploadUserImage(image, filename) {
  const folder = 'user-images';
  if (!image) {
    return alert('Please choose a file to upload first.');
  }
  const url = await UploadImage(image, filename, folder);
  return url;
}

export async function uploadEventImage(image, filename) {
  const folder = 'event-images';
  if (!image) {
    return alert('Please choose a file to upload first.');
  }
  const url = await UploadImage(image, filename, folder);
  return url;
}

