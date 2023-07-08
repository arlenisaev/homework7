import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk('getProducts', async function () {
  try {
    const response = fetch(' https://dummyjson.com/products?limit=10&skip=10')
      .then((response) => response.json())
      .then((data) => data.products);
    return response;
  } catch (e) {
    console.error(e.message);
  }
});

const initialState = { data: [], basket: [] };

const getProductSlice = createSlice({
  name: 'getProductSlice',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const add = state.basket.find((item) => item.id === action.payload.id);
      if (add) {
        let items = state.basket;
        items = items.map((item) => {
          if (item.id === add.id) {
            return { ...item, count: add.count + 1 };
          }
          return item;
        });
        state.basket = items;
      } else {
        state.basket.push({ ...action.payload, count: 1 });
      }
    },
    removeProduct: (state, action) => {
      const add = state.basket.find((item) => item.id === action.payload);
      if (add.count === 1) {
        state.basket = state.basket.filter((item) => item.id !== action.payload);
      } else {
        let items = state.basket;
        items = items.map((item) => {
          if (item.id === add.id) {
            return { ...item, count: add.count - 1 };
          }
          return item;
        });
        state.basket = items;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
export const { addProduct, removeProduct } = getProductSlice.actions;
export default getProductSlice.reducer;
