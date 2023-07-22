import {create} from 'apisauce';

// define the api
const BaseApi = create({
  baseURL: 'http://streaming.nexlesoft.com:3001',
});

export default BaseApi;
