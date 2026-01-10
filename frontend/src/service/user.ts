import { API_URL } from "../constant/default_data";
import axios from "axios";

const fetchUserList = async () => {
  const response = await fetch(API_URL + 'user');
  return response.json();
};

const createNewUser = async (previousState: any, formData: any) => {
  const userData = JSON.stringify(Object.fromEntries(formData));
  try {
    const response = await axios.post(`${API_URL}user`, userData, { 
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    return { error: 'All field required!' };
  }
};

export { fetchUserList, createNewUser };