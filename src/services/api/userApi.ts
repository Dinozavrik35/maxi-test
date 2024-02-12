import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRandomColor } from "../../utils/getRandomColor";
import { UserListItem } from "../../models/UserListItem";
import { UserDTO } from "../../models/UserDTO";


export const baseUrl =
    process.env.REACT_APP_API_URL || "https://jsonplaceholder.typicode.com/";


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
                        color: getRandomColor(),
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
    return userApi.util.updateQueryData(
        "getUserList",
        undefined,
        (userList) => {
            newUser.id = userList[userList.length - 1]
                ? userList[userList.length - 1].id + 1
                : 1;
            newUser.key = String(newUser.id);
            newUser.color = getRandomColor();
            userList.push(newUser);
        }
    );
};

export const deleteUsers = (selectedRows: React.Key[]) => {
    return userApi.util.updateQueryData(
        "getUserList",
        undefined,
        (userList) => {
            return userList.filter(({ key }) => !selectedRows.includes(key));
        }
    );
};

export const { useGetUserListQuery } = userApi;