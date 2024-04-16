import axios from "./axios";
import getIdFromToken from "../jwt/getIdFromToken";


const changePassword = async (passwords) => {
    const user_id = getIdFromToken();
    const accessToken = localStorage.getItem('token')
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers": "content-type",
            "Access-Control-Allow-Credentials": "true"
        }
    
    })
    await authAxios.put(`/users/${user_id}/password`, passwords);
}

export default changePassword