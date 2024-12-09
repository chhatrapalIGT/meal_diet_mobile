import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const checkToken = async () => {
  const token = JSON.parse(await AsyncStorage.getItem("userToken"));
  const config = token
    ? { headers: { Authorization: `Bearer ${token}`, ...headers } }
    : {};
  return config;
};
const Axios = axios.create({
  baseURL: "http://209.97.132.213:3000/", // Replace with your base URL
  // baseURL:
  //   "https://4341-2405-201-2041-8005-a05b-7a10-7435-4412.ngrok-free.app/", // Replace with your base URL
  timeout: 10000, // Request timeout
  headers: headers,
});

export const get = async (url) => {
  const headers = await checkToken();
  try {
    const response = await Axios.get(url, headers);
    return response;
  } catch (error) {
    throw error;
  }
};

export const post = async (url, payload) => {
  const headers = await checkToken();
  try {
    const response = await Axios.post(url, payload, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};
