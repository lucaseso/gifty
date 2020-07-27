import axios from '@/plugins/axios';

const index = _ => {
  return axios.get('/gifts.json');
};

const find = id => {
  return axios.get(`/gifts/${id}.json`);
};

const create = gift => {
  return axios.post('/gifts.json', gift);
};

const update = (id, gift) => {
  return axios.patch(`/gifts/${id}.json`, gift);
};

const remove = id => {
  return axios.delete(`/gifts/${id}.json`);
};

export default {
  find,
  index,
  create,
  update,
  remove,
};
