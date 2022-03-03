import axios from "axios";

let BaseApi = axios.create({
  baseURL: process.env.VUE_APP_URL,
});

export default BaseApi;
