import axios from 'axios';

const api = axios.create({
  baseURL: 'https://9684c30e9c81.ngrok.io',
});

export default api;
