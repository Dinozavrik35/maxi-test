import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserDTO } from "../../models/UserDTO";
import { UserListItem } from "../../store/slices/userSlice";

const baseUrl =
    process.env.REACT_APP_API_URL || "http://jsonplaceholder.typicode.com/";

export const userApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getUserList: builder.query<UserListItem[], void>({
            query: () => "users",
            transformResponse: (response: UserDTO[]) => {
                const modifiedResponse: UserListItem[] = [];
                response.forEach((item) => {
                    modifiedResponse.push({
                        key: item.id.toString(),
                        id: item.id,
                        name: item.name,
                        username: item.username,
                        email: item.email,
                        phone: item.phone,
                        zipcode: item.address.zipcode,
                    });
                });
                return modifiedResponse;
            },
        }),
    }),
});

// функции для работы с кэшем запроса getUserList

export const addUser = (newUser: UserListItem) => {
  return userApi.util.updateQueryData("getUserList", undefined, (userList) => {
      userList.push(newUser);
  });
};

export const deleteUsers = (selectedRows: React.Key[]) => {
    return userApi.util.updateQueryData("getUserList", undefined, (userList) => {
        return userList.filter(({ key }) => !selectedRows.includes(key));
    });
};

export const { useGetUserListQuery } = userApi;