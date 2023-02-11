import axios from 'axios';
import appUserService from '../hooks/userInStorage';

const baseUrl = 'http://localhost:3001/api/customers';

const config = () => ({
  headers: {
    Authorization: `bearer ${appUserService.getToken()}`,
  },
});

const getCustomer = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, config());
  return response.data;
};

const create = async (newCustomer) => {
  const response = await axios.post(baseUrl, newCustomer);
  return response.data;
};

const updateBasic = async (id, updateObject) => {
  const response = await axios.put(`${baseUrl}/updateBasic/${id}`, updateObject, config());
  return response.data;
};

const addAddress = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/newAddress/${id}`, newObject, config());
  return response.data;
};

const updateAddress = async (id, addressId, updateObject) => {
  const response = await axios.put(
    `${baseUrl}/updateAddress/${id}/${addressId}`,
    updateObject,
    config(),
  );
  return response.data;
};

const deleteAddress = async (id, addressId) =>
  axios.delete(`${baseUrl}/deleteAddress/${id}/${addressId}`, config());

const updatePassword = async (id, updateObject) => {
  const response = await axios.patch(`${baseUrl}/changePassword/${id}`, config(), updateObject);
  return response.data;
};

export default {
  getCustomer,
  create,
  updateBasic,
  addAddress,
  updateAddress,
  deleteAddress,
  updatePassword,
};
