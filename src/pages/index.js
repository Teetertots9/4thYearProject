/* eslint react/prop-types: 0 */
import Amplify, {Auth} from "aws-amplify";
import React, {useEffect, useState} from "react";
import awsExports from "../aws-exports";
import { makeStyles } from '@material-ui/core/styles';
import ViewEvents from '../components/View/Events/Events';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import SetUser from "../components/Cards/SetUser/SetUser";
import { uploadUserImage } from '../functions/imageUpload'; 
import NavBar from '../components/View/NavBar/NavBar';
import CreateEvent from '../components/Dialogs/CreateEvent/CreateEvent';
import { createNewEvent, createAcceptedEvent, fetchEvents, updateEmptyEvent, getArtistEvents, getVenueEvents, callSearchEvents } from '../functions/Events';
import { createNewApplication, callUpdateApplication, getEventsForArtist } from '../functions/Applications';
import { adminFetchEvents, adminFetchApplications } from '../functions/Admin';
import {sendNewApplicationEmail, sendNewEventEmail, sendWelcomeEmail, sendEventSelectionEmail} from '../functions/EmailNotifications';
import { uploadApplicationAudio } from '../functions/audioUpload';
import UserProfile from '../components/View/Profile/UserProfile';
import SearchUsers from '../components/View/Search/Search';
import ArtistVenueProfile from '../components/View/ArtistVenueProfile/ArtistVenueProfile';
import AdminView from "../components/View/Admin/Admin";
import { replaceSpecial } from "../functions/strings";
import { createNewFollowingItem, updateFollowingList, searchArtistVenue, getFollowingDetails } from "../functions/Following";
import EventsSearch from "../components/View/Search/SearchEvent";
//import AmplifyTheme from '../misc/AmplifyTheme';

Amplify.configure(awsExports);

Auth.configure(awsExports);

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "#FFD278",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const IndexPage = () => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [userEvents, setUserEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState("events");
  const urlExpression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const urlRegex = new RegExp(urlExpression);
  const [adminEvents, setAEvents ] = useState();
  const [adminApplications, setAApplications] = useState();
  const [userProfiles, setProfiles] = useState([]);
  const [searchEvents, setSearchEvents] = useState([]);
  const [viewUser, setViewUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const userDetails = await Auth.currentUserInfo();
      setUser(userDetails);
  }
  const getEvents = async () => {
    const eventsList = await fetchEvents();
    setEvents(eventsList);
  }

  const getAdminEvents = async () => {
    const adminEventsList = await adminFetchEvents();
    setAEvents(adminEventsList);
  }
  const getAdminApplications = async () => {
    const adminApplicationsList = await adminFetchApplications();
    setAApplications(adminApplicationsList);
  }  
  
    getUser();
    getEvents();
    getAdminEvents();
    getAdminApplications();
  }, []);
   
  const handleAuthChange = async () => {
    await getUser();
    await getEvents();
  }

  const isUrl = (audio) => String(audio).match(urlRegex);

  const getAdminEvents = async () => {
    try {
      const adminEventsList = await adminFetchEvents();
      setAEvents(adminEventsList);
    } catch (error) {
      console.log(error);
    }
    
  }
  const getAdminApplications = async () => {
    try {
      const adminApplicationsList = await adminFetchApplications();
      setAApplications(adminApplicationsList);
    } catch (error) {
      console.log(error);
    }
  }  

  const getUserEvents = async (user) => {
    try{
      let arr = [];
      if(user.attributes['custom:user_type'] === "artist"){
        arr = await getEventsForArtist(user.username);
      } else {
        arr = await getVenueEvents(user.username);
      }
      setUserEvents(arr);
    } catch (error) {
      console.log(error);
    }
  }

  const getSearchEvents = async (type, search) => {
    let queryString = "";
    if(type === "venue"){
      queryString = `?venueSearchName=${encodeURIComponent(replaceSpecial(search).toLowerCase())}`;
    }
    if(type === "artist"){
      queryString = `?artistSearchName=${encodeURIComponent(replaceSpecial(search).toLowerCase())}`;
    }
    const sEvents = await callSearchEvents(queryString);
    setSearchEvents(sEvents);
  }

  const getProfileEvents = async (userProfile) => {
    try {
      var arr = [];
      if(userProfile.userType === "artist"){
        arr = await getArtistEvents(userProfile.user_id);
      } else {
        arr = await getVenueEvents(userProfile.user_id);
      }
      setUserEvents(arr);
    } catch (error) {
      console.log(error);
    }
  }

  const handleViewProfile = async (userProfile) => {
    changePage("view");
    setViewUser(userProfile);
    try {
      await getProfileEvents(userProfile);
    } catch (error) {
      console.log(error);
    }
    
  }

  const changePage = async (pageType, user) => {
    try {
      if(pageType === "profile"){
        await getUserEvents(user);
      }
      setPage(pageType);
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleCreateEvent = async (event) => {
      try {
          console.log(event);
          await createNewEvent(event).then(res => {
            console.log(res);
          });
          await getEvents();
      } catch (error) {
          console.log(error);
      }
  };

  const handleCreateApplication = async (application, event) => {
      try {
          const {eventId, createdBy, sortDate} = event;
          console.log(event);
          const { artistName } = application;
          const file = application.soundFile.target
          const audio = file.value.split(',').pop();
          const fileName = `${user.username}-${file.name}`;
          const uploadedFile = await uploadApplicationAudio(audio, fileName);
          const newApplication = {
            ...application,
            soundFile : uploadedFile,
            soundFileName: file.name,
            createdBy: user.username,
            eventId,
            artistId: user.username
          };
          await createNewApplication(newApplication, eventId, user.username).then(res => {
            console.log(res);
        });
        const body = {
          notificationEvent: {
            artistName,
            sortDate,
            createdBy
          }
        };
        await sendNewApplicationEmail(body).then(res => {
          console.log(res);
        })
        await getEvents();
      } catch (error) {
          console.log(error);
      }
  };

  const handleAcceptApplication = async (event, application) => {
      try {
          await createAcceptedEvent(event, application).then(res => {
            console.log(res);
          });
          const { venueName, sortDate} = event;
          const { artistName } = application;
          const body = {
            notificationEvent: {
              artistName,
              sortDate,
              venueName,
            }, 
            emails: []
          }
          const body2 = {
            notificationEvent: {
              sortDate,
              venueName,
              artistId: application.artistId
            }
          };
          await sendNewEventEmail(body, event.createdBy, application.artistId).then(res => {
            console.log(res);
          })
          await sendEventSelectionEmail(body2);
          await getEvents();
      } catch (error) {
          console.log(error);
      }
  }

  const handleUpdateEvent = async (event, eventId) => {
    try{
      await updateEmptyEvent(event, eventId).then(res => {
        console.log(res);
    });
    await getEvents();
    } catch(error){
      console.log(error);
    }
  }

  const handleUpdateApplication = async (application, applicationId) => {
    try{
      if(isUrl(application.soundFile)){
        await callUpdateApplication(application, applicationId).then(res => {
          console.log(res);
      });
      } else {
        const file = application.soundFile.target
        const audio = file.value.split(',').pop();
        const fileName = `${user.username}-${file.name}`;
        const uploadedFile = await uploadApplicationAudio(audio, fileName);
        const updateApplication = {
          ...application,
          soundFile : uploadedFile,
          soundFileName: file.name,
        };
        await callUpdateApplication(updateApplication, applicationId).then(res => {
          console.log(res);
      });
      }
      await getEvents(); 
    } catch (error) {
      console.log(error);
    }
  }

  const getUser = async () => {
    const userDetails = await Auth.currentUserInfo();
    setUser(userDetails);
}

const getEvents = async () => {
  const eventsList = await fetchEvents();
  setEvents(eventsList);
}

   const handleSetUserType = async (attributes, picture, userType) => {
    try{
      const updateUser = await Auth.currentAuthenticatedUser();
      const image = picture.target.value.split(',').pop();
      const userImage = await uploadUserImage(image, updateUser.username + picture.target.name);
      const userAttributes = {
        ...attributes,
        'custom:user_image' : userImage,
      };
      const body = {
        notificationEvent: {
          name: attributes.name,
          userId: updateUser.username
        }
      };
      const result = await Auth.updateUserAttributes(updateUser, userAttributes);
      const result2 = await handleFollowCreate(user.username, userAttributes, userType, userImage);
      await sendWelcomeEmail(body);
      console.log(result, "+", result2);
      await getUser();
    } catch (error) {
        console.log(error);
    }
  }

  const handleUpdateUser = async (attributes, picture, changedPicture) => {
    try{
      let userAttributes = {};
      let followUpdate = {};
      const updateUser = await Auth.currentAuthenticatedUser();
      const follow = await getFollowingDetails(updateUser.username);
      if(changedPicture){
      const image = picture.target.value.split(',').pop();
      const userImage = await uploadUserImage(image, updateUser.username + picture.target.name);
      userAttributes = {
        ...attributes,
        'custom:user_image' : userImage,
      };
      } else {
        userAttributes = {
          ...attributes,
        };
      }
      const result = await Auth.updateUserAttributes(updateUser, userAttributes);
      if(userAttributes['custom:user_type'] === "artist"){
        followUpdate = {
          artistName : userAttributes.name,
          userPicture: userAttributes['custom:user_image'],
          userType: "artist",
          user_followers: follow.user_followers,
          artistSearchName: replaceSpecial(userAttributes.name.toLowerCase()),
        }
      } else if(userAttributes['custom:user_type'] === "venue") {
        followUpdate = {
          venueName : userAttributes.name,
          userPicture: userAttributes['custom:user_image'],
          venueLocation: userAttributes.address,
          userType: "venue",
          user_followers: follow.user_followers,
          venueSearchName: replaceSpecial(userAttributes.name.toLowerCase()),
        }
      }
      const result2 = await handleFollowUpdate(updateUser.username, followUpdate);
      console.log(result, "+", result2);
      await getUser();
    } catch (error) {
      console.log(error);
    }
  }

  const handleFollowCreate = async (username, user, userType, userImage) => {
    try{
      let newFollow = {};
      if(user['custom:user_type'] === "artist"){
        newFollow = {
          artistName : user.name,
          artistSearchName: replaceSpecial(user.name.toLowerCase()),
          userPicture : user['custom:user_image'],
          username,
          userType: "artist"
        }
      } else if (user['custom:user_type'] === "venue") {
        newFollow = {
          venueName : user.name,
          venueSearchName: replaceSpecial(user.name.toLowerCase()),
          userPicture : user['custom:user_image'],
          username,
          venueLocation: user.address,
          userType: "venue"
        }
      }
      await createNewFollowingItem(newFollow);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFollowUpdate = async (username, update) => {
    try {
      console.log(username, " ", update);
      await updateFollowingList(username, update);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFollowUser = async (user, userProfile) => {
    try{
      let updateProfile = {};
      if(userProfile.isFollowing && userProfile.artistName){
        const {artistName, userPicture, userType, artistSearchName} = userProfile;
        const newfollowers = userProfile.user_followers.filter(f => user.username !== f);
        updateProfile = {
          artistName, userPicture, userType, artistSearchName,
          user_followers: newfollowers
        }; 
      } else if(userProfile.isFollowing && userProfile.venueName){
        const {venueName, venueLocation, userPicture, userType, venueSearchName} = userProfile;
        const newfollowers = userProfile.user_followers.filter(f => user.username !== f);
        updateProfile = {
          venueName, venueLocation, userPicture, userType, venueSearchName,
          user_followers: newfollowers
        };
      } else if(userProfile.isFollowing === false && userProfile.artistName){
        const {artistName, userPicture, userType, artistSearchName} = userProfile;
        const newfollowers = [...userProfile.user_followers, user.username];
        updateProfile = {
          artistName, userPicture, userType, artistSearchName,
          user_followers: newfollowers
        }; 
      }
      else if(userProfile.isFollowing === false && userProfile.venueName){
        const {venueName, venueLocation, userPicture, userType, venueSearchName} = userProfile;
        const newfollowers = [...userProfile.user_followers, user.username];
        updateProfile = {
          venueName, venueLocation, userPicture, userType, venueSearchName,
          user_followers: newfollowers
        };
      }
      await updateFollowingList(userProfile.user_id, updateProfile);
      userProfile.isFollowing = !userProfile.isFollowing;
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchUsers = async (userType, search) => {
    try{
      const users = await searchArtistVenue(userType, search, user);
      setProfiles(users);
    } catch (error) {
      console.log(error);
    }
  }

   const renderIndex = () => {
     if(user && user.attributes.email === "admin@seobooker.com"){
       return(
         <div>
        <NavBar 
         user={user}
         page={"admin"}
       />
       <AdminView
       events={adminEvents}
       applications={adminApplications}
       getAdminEvents={getAdminEvents}
       getAdminApplications={getAdminApplications}/>
         </div>
       );
     }
     else if(user && user.attributes['custom:user_type']) {
       if(page === "profile"){
        return (<div>
          <NavBar 
         user={user}
         openCreate={openCreate}
         changePage={changePage}
         page={page}
       />
       <UserProfile
       user={user}
       userProfile={user}
       userEvents={userEvents}
       handleAcceptApplication={handleAcceptApplication}
       handleUpdateEvent={handleUpdateEvent}
       handleUpdateApplication={handleUpdateApplication}
       handleUpdateUserDetails={handleUpdateUser}
       />
       <CreateEvent
             open={open}
             handleClose={closeCreate}
             onSubmit={handleCreateEvent}
             user={user}
             />
        </div>);
       }
       else if(page === "events"){
        return (
          <div>
         <NavBar 
         user={user}
         openCreate={openCreate}
         changePage={changePage}
         page={page}
       />
         <ViewEvents
           user={user}
           events={events}
           handleAcceptApplication={handleAcceptApplication} 
           handleCreateApplication={handleCreateApplication}
           handleUpdateEvent={handleUpdateEvent}
           handleUpdateApplication={handleUpdateApplication}
         />
            <CreateEvent
             open={open}
             handleClose={closeCreate}
             onSubmit={handleCreateEvent}
             user={user}
             />
         </div>
        );
       } else if(page === "search"){
        return(
          <div>
            <NavBar 
              user={user}
              openCreate={openCreate}
              changePage={changePage}
              page={page}
            />
            <SearchUsers
            userProfiles={userProfiles}
            user={user} 
            handleSearchUsers={handleSearchUsers} 
            handleFollowUser={handleFollowUser} 
            handleViewProfile={handleViewProfile}/>
            <CreateEvent
             open={open}
             handleClose={closeCreate}
             onSubmit={handleCreateEvent}
             user={user}
             />
          </div>
        );
       }else if(page === "search-events"){
        return(
          <div>
            <NavBar 
              user={user}
              openCreate={openCreate}
              changePage={changePage}
              page={page}
            />
            <EventsSearch
            events={searchEvents}
            user={user} 
            handleSearchEvents={getSearchEvents}
            updateEvent={handleUpdateEvent}
            acceptApplication={handleAcceptApplication}
            createApplication={handleCreateApplication}
            updateApplication={handleUpdateApplication}/>
            <CreateEvent
             open={open}
             handleClose={closeCreate}
             onSubmit={handleCreateEvent}
             user={user}
             />
          </div>
        );
       } else if(page === "view"){
          return(
            <div>
            <NavBar 
              user={user}
              openCreate={openCreate}
              changePage={changePage}
              page={page}
            />
            <ArtistVenueProfile
            user={user}
            userProfile={viewUser}
            handleFollowUser={handleFollowUser}
            events={userEvents} />
            <CreateEvent
             open={open}
             handleClose={closeCreate}
             onSubmit={handleCreateEvent}
             user={user}
             />
            </div>
        );
       }
     }
     else if (user && !user.attributes['custom:user_type']) {
       return(
          <SetUser handleSetUserType={handleSetUserType}/>
      );
     }
    }

    const openCreate = () => setOpen(true);
    const closeCreate = () => setOpen(false);

    return(
      <div>
   <AmplifyAuthenticator initialAuthState='signup' handleAuthStateChange={handleAuthChange}>
     
     {renderIndex()}
     
   </AmplifyAuthenticator>
   </div>
   );
};

export default IndexPage;