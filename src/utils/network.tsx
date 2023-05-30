import axios from "axios";

const client = axios.create({
  baseURL: "",
});

// client.interceptors.request.use(Refresh, refreshErrorHandle);

export default client;
