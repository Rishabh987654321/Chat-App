import { HOST } from "@/utils/constants";
import { default as axios } from "axios";


export const apiClient=axios.create({
    baseURL:HOST,
    withCredentials:true
});

