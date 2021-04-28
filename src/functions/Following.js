import {searchGetFollowing, createFollowingItem, updateFollowing, getFollowing} from '../api/Following';
import {betterEncodeURIComponent, replaceSpecial} from './strings';

export async function searchArtistVenue(userType, values, user){
    try {
        let querystring = ``;
        if(userType === "artist"){
            querystring = `?artistSearchName=${betterEncodeURIComponent(replaceSpecial(values))}`;
        } else {
            querystring = `?venueSearchName=${betterEncodeURIComponent(replaceSpecial(values))}`;
        }
        const response = await searchGetFollowing(querystring);
        let check = false;
        for( var i = 0; i < response.Items.length; i++){
            for(var j = 0; j < response.Items[i].user_followers.length; j++){
                if(user.username === response.Items[i].user_followers[j]){
                    response.Items[i].isFollowing = true;
                    check = true;
                }
            }
            if(check === false){
                response.Items[i].isFollowing = false;
            }
            check = false;
        }
        return response.Items;
    } catch (error) {
        console.log(error);
    }
}

export async function createNewFollowingItem(body){
    try {
        const response = await createFollowingItem(body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function updateFollowingList(user_id, body){
    try {
        const response = await updateFollowing(user_id, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function getFollowingDetails(user_id){
    try{
        const response = await getFollowing(user_id);
        return response.Item;
    } catch (error) {
        console.log(error)
    }
}