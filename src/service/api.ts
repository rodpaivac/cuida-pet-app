import { AppError } from "@utils/AppError";
import axios from "axios";

// rodar ipconfig no terminal para obter o ip

const api = axios.create({
    // baseURL: 'https://api-pet-vaccine.onrender.com/' //prod
    baseURL: 'http://192.168.18.10:3000/' //dev
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