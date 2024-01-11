import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

type SortType = {
    name: string
    sortProperty: "rating" | "title" | "price" | "-rating" | "-title" | "-price"
}

export interface FilterSliceState {
    categoryId: number
    searchValue: string
    currentPage: number
    sort: SortType
}

const initialState: FilterSliceState = {
    categoryId: 0,
    searchValue: '',
    currentPage: 1,
    sort: {
        name: "популярности",
        sortProperty: "rating",
    },
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<SortType>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
            state.sort = action.payload.sort;
        }
    },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort

export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;