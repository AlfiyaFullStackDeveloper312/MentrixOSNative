import axios from 'axios';
import {Platform} from 'react-native';
import {getItem} from '../utils/storage';

const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:5001' : 'http://localhost:5001';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(async config => {
  try {
    const session = await getItem('session');

    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
  } catch (error) {
    console.log('Token attach error:', error);
  }

  return config;
});

client.interceptors.response.use(
  response => response,
  error => {
    console.log('API ERROR:', error?.response?.data || error.message);

    return Promise.reject(error);
  },
);

export default client;
