import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-pet-vaccine.onrender.com/'
});


api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.message && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message))

    } else {
        return Promise.reject(error)
    }
})


export { api }