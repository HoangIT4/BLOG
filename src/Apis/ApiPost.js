import axiosClient from './axiosClient.js';

export const getCustomer = () => axiosClient.get('/posts');