// eslint-disable-next-line no-unused-vars
/* eslint-disable */
import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "http://localhost:3000"
  });
};
