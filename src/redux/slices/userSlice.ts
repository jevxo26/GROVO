import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserProfile: builder.query<any, void>({
      query: () => "/user/user-profile",
      providesTags: [{ type: "User", id: "PROFILE" }],
    }),
    signUp: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/user/sign-up",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<any, { email: string; otp: string }>({
      query: (data) => ({
        url: "/user/verify-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),
    login: builder.mutation<any, Partial<any>>({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),
    updateUserInfo: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/user",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),
    updateNotificationSettings: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/user/updateNotificationSettings",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),
    updateUserSecurity: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/user/updateSecurity",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useSignUpMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useUpdateUserInfoMutation,
  useUpdateNotificationSettingsMutation,
  useUpdateUserSecurityMutation,
} = userApi;
