import axios from "axios";
import {Employee} from "../components/app/app";

const BASE_URL = 'http://localhost:3400'
axios.defaults.baseURL = BASE_URL



export const UserService = {
    async getAll(){
        return axios.get<Employee[]>('/users')
    },
    async post(data: Employee){
        return axios.post('/users', data, {headers: {'Content-Type': 'application/json'}})
    }
}