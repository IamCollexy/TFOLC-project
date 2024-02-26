import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { baseURL } from '@/src/config/baseUrl';
import { setIsAuth, logOut } from './isAuthSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    // Get the accessToken from the Redux store
    const accessToken = getState().isAuth.accessToken;
    const refreshToken = getState().isAuth.refreshToken;
    const email = getState().user.email;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
      headers.set('x-user-token', refreshToken);
      headers.set('x-user-email', email);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    (result.error && result.error.status === 403) ||
    (result.error && result.error.status === 401)
  ) {
    // try to get a new token
    const refreshResult = await baseQuery(
      'auth/refresh',
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // store the new token
      api.dispatch(
        setIsAuth({
          isAuth: true,
          accessToken: refreshResult?.data?.accessToken,
          refreshToken: refreshResult?.data?.refreshToken,
        })
      );
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const request = createApi({
  reducerPath: 'request',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getData: builder.query({
      query: (url) => url,
    }),
    sendData: builder.mutation({
      query: ({ url, data, type }) => ({
        url: url,
        method: type,
        body: data,
      }),
      transformResponse: (response) => {
        // Do any necessary data transformation
        return response;
      },
    }),
  }),
});

export const { useSendDataMutation, useGetDataQuery } = request;
