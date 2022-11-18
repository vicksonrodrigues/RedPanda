import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/menu';

const getSubMenu = (subMenu) => {
  const request = axios.get(`${baseUrl}/${subMenu}`);

  return request.then((response) => response.data);
};

export default { getSubMenu };
