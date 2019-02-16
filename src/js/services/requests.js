import axios from "axios";

const getData = (url) => axios.get(`${url}`);

export default {
  getData
}