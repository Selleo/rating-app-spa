import axios from 'axios'

const client = axios.create({
  baseURL: "http://192.168.1.44:3000/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/vnd.api+json"
  }
});

export default client;
