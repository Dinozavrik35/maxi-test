import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserDTO } from "../../models/UserDTO";

export type UserListItem = { key: string } & Omit<
    UserDTO,
    "address" | "company" | "website"
> & { zipcode?: string };

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

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setFilterField: (
            state,
            action: PayloadAction<FilterFieldType>
        ) => {
            state.filterField = action.payload;
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterValue = action.payload.toLocaleLowerCase();
        },
        setSelectedRows: (state, action: PayloadAction<React.Key[]>) => {
            state.selectedRows = action.payload;
        },
    },
});

export const { setFilterField, setFilterValue, setSelectedRows } =
    userSlice.actions;
export default userSlice.reducer;
