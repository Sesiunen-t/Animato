import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://your-api-url.com';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
});

export const fetchVideos = async (): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response = await instance.get('/videos');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postText = async (text: string): Promise<AxiosResponse<any> | undefined> => {
  try {
    const response = await instance.post('/text', { text });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
