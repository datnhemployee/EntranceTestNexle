import {GetCategoryListSuccess} from '../mock/category';
import BaseApi from './base';

const getList = async () => {
  // const response = await BaseApi.get('auth/signup');
  // return response?.data;
  return GetCategoryListSuccess;
};

const CategoryService = {
  getList,
};

export default CategoryService;
