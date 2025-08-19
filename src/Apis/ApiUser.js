import axiosClient from "@/Apis/axiosClient.js";

export const Login = () => axiosClient.post('/login');
export const Register = () => axiosClient.post('/register');