import axios from 'axios';

const api = axios.create({
  baseURL:
    'http://localhost:3001/api/' ||
    'https://vilson-camargo-desafio-final.herokuapp.com',
});

export default api;
