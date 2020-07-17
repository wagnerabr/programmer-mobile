import axios  from 'axios';

const api = axios.create({
    baseURL: 'https://programmers-api.herokuapp.com',
})

export default api;