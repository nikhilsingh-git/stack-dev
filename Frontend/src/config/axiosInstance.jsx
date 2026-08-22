import axios from "axios";

export let axiosInstance = axios.create({
    baseURL:"https://api.team-sync.space/api",
    withCredentials:true,
})