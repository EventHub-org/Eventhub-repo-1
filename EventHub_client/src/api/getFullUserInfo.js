import axios from "./axios";
const READ_URL = '/users/';


export const getFullUserInfo = async (userId) =>{
    try{
        const response = await axios.get(READ_URL + userId);
        console.log(response);
        return response.data;
    }
    catch(error){
        console.log('Error getting full info about user', error);
    }
}