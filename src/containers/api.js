import axios from 'axios';

const instance = axios.create({
  baseURL: '',
  // baseURL: `http://localhost/`,
});

export default instance;