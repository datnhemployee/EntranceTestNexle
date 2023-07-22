import {createSlice} from '@reduxjs/toolkit';
import {ListState} from '../../types';
import {getCategoryList} from './actions';

export type Category = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type CategoryState = ListState<Category> & {
  pickedList: Category[];
};

const INITIAL_STATE: CategoryState = {
  data: [],
  status: 'new',
  message: '',
  pickedList: [],
};

const Slice = createSlice({
  name: 'category',
  initialState: INITIAL_STATE,
  reducers: {
    setPickedList: (state, action) => {
      state.pickedList = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategoryList.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload ?? [];
      state.message = '';
    });
    builder.addCase(getCategoryList.rejected, (state, action) => {
      state.status = 'error';
      state.message = action.error.message!;
    });
  },
});

export const {reducer: CategoryReducer, actions: CategoryActions} = Slice;
