import axios from 'axios'

const URL = "/api/v1";
const HEADERS = { headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')} };

export function APIgetBox(id) {
  return axios.get(`${URL}/boxes/${id}`, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}

export function APIgetBoxes() {
  return axios.get(`${URL}/boxes/`, HEADERS)
  .then(response => {
    console.log(response);
    return { boxes:
      response.data.boxes.map((b) => {
        const bCount = response.data.counts[b.id]
        if(bCount) {
          return {...b, count: bCount}
        } else {
          return {...b, count: 0}
        }
      }
    )}
  })
  .catch(error => console.log(error))
}

export function APInewBox(name, language) {
  const content = {name: name, language: language}
  return axios.post(`${URL}/boxes/new`, content, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}

export function APIdeleteBox(id) {
  return axios.delete(`${URL}/boxes/${id}`, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}

export function APIresetBox(id) {
  return axios.get(`${URL}/boxes/${id}/reset`, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}

export function APInewCard(boxId, from, to) {
  const content = {box_id: boxId, from: from, to: to}
  return axios.post(`${URL}/cards/new`, content, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}

export function APIdeleteCard(id) {
  return axios.delete(`${URL}/cards/${id}`, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}

export function APInewCardBatch(boxId, csv) {
  const content = {box_id: boxId, csv: csv}
  return axios.post(`${URL}/cards/new_batch`, content, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}

export function APIupdateCard(id, correct) {
  const content = {correct: correct}
  return axios.patch(`${URL}/cards/${id}`, content, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}

export function APIupdateSlot(id, content) {
  return axios.patch(`${URL}/slots/${id}`, content, HEADERS)
  .then(response => response.data)
  .catch(error => console.log(error))
}
