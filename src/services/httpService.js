import axios from 'axios';
import Cookies from 'js-cookie';


const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  timeout: 500000,
  headers: {
    Accept: 'application/json',
   'content-type': 'multipart/form-data' 

  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let adminInfo;
  if (Cookies.get('adminInfo')) {
    adminInfo = JSON.parse(Cookies.get('adminInfo'));
  }

  return {
    ...config,
    headers: {
      authorization: adminInfo ? `Bearer ${adminInfo.accessToken}` : null,
    },
  };
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, headers).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url) => instance.delete(url).then(responseBody),
};

export default requests;
