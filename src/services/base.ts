import {create} from 'apisauce';

const BaseSauce = create({
  baseURL: 'http://streaming.nexlesoft.com:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

const PrivateSauce = create({
  baseURL: 'http://streaming.nexlesoft.com:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

let store: any = null;
export const initStore = (reduxStore: any) => {
  store = reduxStore;
};

const PublicApi = BaseSauce.axiosInstance;
const PrivateApi = PrivateSauce.axiosInstance;

PrivateApi.interceptors.request.use(async config => {
  const accessToken = store?.getStates?.()?.auth?.accessToken ?? '';
  config.headers.authorization = accessToken;
  return config;
});

export {PublicApi, PrivateApi};
