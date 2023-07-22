import {PrivateApi} from './base';

const getList = async () => {
  const response = await PrivateApi.get('auth/signup');
  return response?.data;
};

const CategoryService = {
  getList,
};

export default CategoryService;
