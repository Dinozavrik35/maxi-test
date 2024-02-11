import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { noLettersRegex } from "../../constants/regex";


export type FilterFieldType = "name" | "email" | "phone";

type UserSliceInitialState = {
    filterField: FilterFieldType;
    filterValue: string;
    selectedRows: React.Key[];
};

const initialState: UserSliceInitialState = {
    filterField: "name",
    filterValue: "",
    selectedRows: [],
};


export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setFilterField: (state, action: PayloadAction<FilterFieldType>) => {
            if (state.filterValue && state.selectedRows) {
                state.selectedRows = [];
            }
            if (
                action.payload === "phone" &&
                !noLettersRegex.test(state.filterValue)
            ) {
                state.filterValue = "";
            }
            state.filterField = action.payload;
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            if (state.selectedRows) state.selectedRows = [];
            state.filterValue = action.payload;
        },
        setSelectedRows: (state, action: PayloadAction<React.Key[]>) => {
            state.selectedRows = action.payload;
        },
    },
});


export const { setFilterField, setFilterValue, setSelectedRows } =
    usersSlice.actions;
export default usersSlice.reducer;
