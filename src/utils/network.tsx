import axios from "axios";
import { Refresh, refreshErrorHandle } from "./refresh";

const client = axios.create({
  baseURL: "http://192.168.0.116:8080",
});

// client.interceptors.request.use(Refresh, refreshErrorHandle);

export default client;
