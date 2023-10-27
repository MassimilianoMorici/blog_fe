import axios from "axios";

class AxiosClient {

    constructor() {
        const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

        this.axiosInstance = axios.create({
            baseURL: baseUrl,
        })
    }

    async get(url, config) {
        const response = await this.axiosInstance.get(url, config)
        return response.data
    }

    async post(url, body, config) {
        const response = await this.axiosInstance.post(url, body, config)
        return response.data
    }

    async put(url, body, config) {
        const response = await this.axiosInstance.put(url, body, config)
        return response.data
    }


    async delete(url, config) {
        const response = await this.axiosInstance.delete(url, config)
        return response.data
    }



}

export default AxiosClient;