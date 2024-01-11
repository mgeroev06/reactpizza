import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {AppDispatch, RootState} from "../store";

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>, {dispatch: AppDispatch}>(
  'pizza/fetchPizzasStatus', async (params) => {
      const {sortBy, order, category, search, currentPage} = params;
      const {data} = await axios.get<Pizza[]>(
        `https://658a6740ba789a962237039d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      );
      return data;
  });

type Pizza = {
  id: string
  title: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
  rating: number
}

interface PizzaSliceState {
  items: Pizza[]
  status: Status
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

const pizzaSlice = createSlice({
      name: "pizza",
      initialState,
      reducers: {
          setItems(state, action: PayloadAction<Pizza[]>) {
              state.items = action.payload;
          },
      },
      extraReducers: (builder) => {
          builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR
                state.items = []
            })
      }

  })
;

export const selectPizzaData = (state: RootState) => state.pizza;

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer