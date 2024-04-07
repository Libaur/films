import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = process.env.BASE_URL;
const token = Cookies.get('token');
const userId = Cookies.get('userId');

const getRequest = async (url: string) => {
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const postRequest = async (id: number, favorite: boolean) => {
  const url = `${baseUrl}account/${userId}/favorite`;
  const body = { media_type: 'movie', media_id: id, favorite: favorite };
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(url, body, options);
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

export { getRequest, postRequest };
