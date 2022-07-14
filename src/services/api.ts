import axios from "axios";
import { RootState, store } from "../app/store";
import { clearToken } from "../features/auth/authSlice";

export const client = axios.create();

export const API_URL = "https://reqres.in/api";
client.defaults.baseURL = API_URL;

client.interceptors.request.use((request) => {
  if (!request.headers) {
    return request;
  }
  let token = (store.getState() as RootState).auth.token;
  if (token) {
    request.headers!.auth = token;
  }
  return request;
});

client.interceptors.response.use((response) => {
  if (response.status === 403) {
    store.dispatch(clearToken());
  }
  return response;
});
