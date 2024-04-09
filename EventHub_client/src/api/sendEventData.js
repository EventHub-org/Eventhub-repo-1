import axios from "./axios";


export const sendDataWithoutPhotos = async (eventData, owner_id) => {
    const accessToken = localStorage.getItem('token')
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers": "content-type",
            "Access-Control-Allow-Credentials": "true"
        }
    })
    try {
        const response = await authAxios.post(`/users/${owner_id}/events`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error sending data without photos to server:', error);

        throw error;
    }
};

export const sendPhotosToServer = async (files, event_id) => {

    const accessToken = localStorage.getItem('token')
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers": "content-type",
            "Access-Control-Allow-Credentials": "true"
        }
    })
    try {

        const response = await authAxios.post(`/events/${event_id}/photos/upload`, files);

        return response.data;
    } catch (error) {
        console.error('Error uploading photos to server:', error);

        throw error;
    }
};
