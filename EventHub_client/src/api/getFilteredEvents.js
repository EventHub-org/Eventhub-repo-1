import axios from "./axios";
import queryString from 'query-string';
const FILTER_URL = 'users/events/filter'


export const getFilteredEvents = async () =>{
    const parsed = queryString.parse(window.location.search);
    if ('category_requests' in parsed) {
        if(Array.isArray(parsed.category_requests)){
            parsed.category_requests = parsed.category_requests.map(category => ({name: category}));
        }
         else{
            parsed.category_requests = [{name: parsed.category_requests}];
        }
    }
    else{
        parsed.category_requests = [];
    }

    try{
        const response = await axios.post(FILTER_URL, parsed)
        return response.data;
    }
    catch(error){
        console.log('Error getting filtred events', error);
    }
}