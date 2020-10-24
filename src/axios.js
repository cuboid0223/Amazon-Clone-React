import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/clone-d7a99/us-central1/api", // <<< the API (cloud func) URL
});


export default instance;