import api from '../Api';

async function deleteTransaction(id) {
  return await api.delete(`transaction/${id}`);
}
function findBYPeriod(period) {
  return api.get(`transaction/period/${period}`);
}
function findBYDescription(description) {
  return api.get(`transaction/period/${description}`);
}
function insertTransaction(transaction) {
  return api.post(`transaction/`, transaction);
}
function updateTransaction(id, transaction) {
  return api.put(`transaction/${id}`, transaction);
}

export {
  deleteTransaction,
  findBYPeriod,
  findBYDescription,
  insertTransaction,
  updateTransaction,
};
