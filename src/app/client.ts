import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
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
    toast.error(
      'Произошла ошибка при загрузке данных. Попробуйте проверить соединение и повторить позднее.'
    );
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
    if (AxiosError) {
      return 400;
    }
    toast.error('Произошла ошибка при обновлении данных. Попробуйте повторить позднее.');
    console.error(error);
  }
};

export { getRequest, postRequest };
