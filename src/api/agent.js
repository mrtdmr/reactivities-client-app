import axios from 'axios';
import { history } from '../index';
import { toast } from 'react-toastify';
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(undefined, error => {
  const { status, data, config } = error.response;
  if (error.message === 'Network Error' && !error.response)
    toast.error('Netwok Error - make sure API is running');
  if (status === 404) {
    history.push('/notfound');
  }
  if (
    status === 400 &&
    config.method === 'get' &&
    data.errors.hasOwnProperty('id')
  ) {
    history.push('/notfound');
  }
  if (status === 500)
    toast.error('Server Error - check the terminal for more info');
  throw error.response;
});

const responseBody = (response: AxiosResponse) => {
  return response && response.data;
};

const sleep = ms => (response: AxiosResponse) =>
  new Promise(resolve => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) => {
    axios
      .put(url, body)
      .then(sleep(3000))
      .then(responseBody);
  },
  delete: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Activities = {
  list: (): Promise => requests.get('/activities'),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: activity => requests.post('/activities', activity),
  update: activity => requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`)
};
const User = {
  current: (): Promise => requests.get('/user'),
  login: (user): Promise => requests.post(`/user/login`, user),
  register: (user): Promise => requests.post(`/user/register`, user)
};

export default {
  Activities,
  User
};
