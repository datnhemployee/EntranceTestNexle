import {Category} from '../../redux/category/slice';

export const NUM_CATEGORY_PER_ROW = 3;

const useCategoryRowList = (categoryList: Category[]) => {
  const rowList = (!categoryList?.length ? [] : categoryList).reduce<
    Category[][]
  >((prevList, category, index) => {
    if (!prevList?.length) {
      return [[category]];
    }
    if (index % NUM_CATEGORY_PER_ROW === 0) {
      prevList.push([category]);
      return prevList;
    }
    const prevRow = prevList[prevList.length - 1];
    prevRow.push(category);
    return prevList;
  }, []);

  return rowList;
};

export default useCategoryRowList;
