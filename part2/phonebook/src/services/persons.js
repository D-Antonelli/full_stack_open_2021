/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const promise = axios.get(baseUrl);
    return promise.then(response => response.data);
}

const create = newObj => {
    const promise = axios.post(baseUrl, newObj);
    return promise.then(response => response.data);
}

export default {
  create,
  getAll
};