import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserDTO } from '../../models/UserDTO'

const baseUrl = process.env.REACT_APP_API_URL || 'http://jsonplaceholder.typicode.com/';

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getUserList: builder.query<UserDTO[], void>({
      query: () => 'users',
    }),
  }),
})

export const {
  useGetUserListQuery
} = userApi
