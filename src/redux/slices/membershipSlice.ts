import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface MembershipData {
  id: string | number;
  [key: string]: any;
}

export interface MembershipResponse {
  success: boolean;
  message: string;
  data: MembershipData | MembershipData[];
}

export const membershipApi = createApi({
  reducerPath: "membershipApi",
  baseQuery,
  tagTypes: ["Membership"],
  endpoints: (builder) => ({
    getAllMemberships: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/user/memberships", params } : "/user/memberships"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Membership" as const, id })),
              { type: "Membership" as const, id: "LIST" },
            ]
          : [{ type: "Membership" as const, id: "LIST" }],
    }),
    getMembershipById: builder.query<any, string | number>({
      query: (id) => "/user/memberships/${id}",
      providesTags: (result, error, id) => [{ type: "Membership", id }],
    }),
    createMembership: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/user/memberships",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Membership", id: "LIST" }],
    }),
    updateMembership: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/user/memberships/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Membership", id },
        { type: "Membership", id: "LIST" },
      ],
    }),
    deleteMembership: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/user/memberships/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Membership", id },
        { type: "Membership", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllMembershipsQuery,
  useGetMembershipByIdQuery,
  useCreateMembershipMutation,
  useUpdateMembershipMutation,
  useDeleteMembershipMutation,
} = membershipApi;
