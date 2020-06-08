import axios from 'axios';

export function request(config) {
  // 1.创建实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/hy'
  });

  // 2.拦截器
  instance.interceptors.request.use(config => {
    return config;
  },error => {
    console.log(error);
  });

  instance.interceptors.response.use(result => {
    return result.data;
  },error => {
    console.log(error);
  });

  return instance(config);
}
