/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
    const promise = axios.get(baseUrl);
    return promise.then(response => response.data);
}

const create = newObj => {
    const promise = axios.post(baseUrl, newObj);
    return promise.then(response => response.data);
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`);
}

const change = (id, changedObj) => {
  const promise = axios.put(`${baseUrl}/${id}`, changedObj);
  return promise.then(response => response.data);
}

export default {
  create,
  deletePerson,
  change,
  getAll
};