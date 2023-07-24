import {GetCategoryListSuccess} from '../mock/category';
import {PrivateApi} from './base';

const getList = async () => {
  return GetCategoryListSuccess;
  // const response = await PrivateApi.get('auth/signup');
  // return response?.data;
};

const CategoryService = {
  getList,
};

export default CategoryService;
