// No default export present, add a dummy default export to satisfy routing requirement
import axios from "axios";
import { Platform } from 'react-native';

const BASE_URL = __DEV__ 
  ? Platform.select({
      android: "http://10.0.2.2:3000", // Android Emulator
      ios: "http://localhost:3000", // iOS Simulator
      default: "http://localhost:3000"
    })
  : "https://bes-dsp-app.firebaseapp.com"; // Production URL

// Users API
export async function fetchUsers() {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
}

export async function fetchUserById(userId: string) {
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
}

export async function createUser(userData: any) {
  const response = await axios.post(`${BASE_URL}/users`, userData);
  return response.data;
}

export async function updateUser(userId: string, updateData: any) {
  const response = await axios.put(`${BASE_URL}/users/${userId}`, updateData);
  return response.data;
}

export async function deleteUser(userId: string) {
  const response = await axios.delete(`${BASE_URL}/users/${userId}`);
  return response.data;
}

// Add similar functions for other collections as needed

export default null;
