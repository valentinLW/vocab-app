import axios from 'axios'

const URL = "/api/v1";
const HEADERS = { headers: {'Content-Type': 'application/json', 'Authorization': `bearer asdasdasdtokenasdasd`} };

export function APIgetBox(id) {
  return axios.get(`${URL}/boxes/${id}`, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}

export function APIgetBoxes() {
  return axios.get(`${URL}/boxes/`, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}

export function APIupdateCard(id, correct) {
  const content = {correct: correct}
  return axios.patch(`${URL}/cards/${id}`, content, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}
