import axiosClient from './axiosClient.js';

export const getPost = () => axiosClient.get('/posts');