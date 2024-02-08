import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserDTO } from "../../models/UserDTO";

export type UserListItem = { key: string } & Omit<
    UserDTO,
    "address" | "company" | "website"
> & { zipcode?: string };

const initialState: UserListItem[] = [];

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserList: (state, action: PayloadAction<UserListItem[]>) => {
            return action.payload;
        },
        addUser: (state, action: PayloadAction<UserListItem>) => {
            return [...state, action.payload];
        },
        deleteUser: (state, action: PayloadAction<React.Key[]>) => {
            return state.filter(({ key }) => !action.payload.includes(key));
        },
    },
});


export const { setUserList, addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;