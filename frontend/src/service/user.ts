import { API_URL } from "../constant/default_data";
import axios from "axios";

const fetchUserList = async () => {
  const response = await fetch(API_URL + 'user');
  return response.json();
};

const createNewUser = async (previousState: any, formData: any) => {
  const userData = JSON.stringify(Object.fromEntries(formData));
  const userId = formData.get('_id');
  try {
    if (userId) {
      const response = await axios.patch(`${API_URL}user/${userId}`, userData, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } else {
      // Create new user
      const response = await axios.post(`${API_URL}user`, userData, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    }
  } catch (error) {
    return { error: 'All field required!' };
  }
};

const fetchUserById = async (userId: string) => {
  const response = await fetch(`${API_URL}user/${userId}`);
  return response.json();
};

const deleteUserById = async (userId: string) => {
  const response = await fetch(`${API_URL}user/${userId}`, {
    method: 'DELETE',
  });
  return response.json();
};

export { fetchUserList, createNewUser, fetchUserById, deleteUserById };


