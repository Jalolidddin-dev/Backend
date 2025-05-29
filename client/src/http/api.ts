import axios from 'axios';
import { API_URL } from '.';

const $api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

export default $api;
