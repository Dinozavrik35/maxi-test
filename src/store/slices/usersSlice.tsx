import { PayloadAction, createSlice } from "@reduxjs/toolkit";


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
            state.filterField = action.payload;
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload
                .toLocaleLowerCase()
                .replace(/[_()+.-]/g, "");
        },
        setSelectedRows: (state, action: PayloadAction<React.Key[]>) => {
            state.selectedRows = action.payload;
        },
    },
});


export const { setFilterField, setFilterValue, setSelectedRows } =
    usersSlice.actions;
export default usersSlice.reducer;
