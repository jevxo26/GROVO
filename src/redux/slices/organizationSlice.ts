import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface OrganizationData {
  id: string | number;
  [key: string]: any;
}

export interface OrganizationResponse {
  success: boolean;
  message: string;
  data: OrganizationData | OrganizationData[];
}

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery,
  tagTypes: ["Organization"],
  endpoints: (builder) => ({
    getAllOrganizations: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/organizations", params } : "/organizations"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Organization" as const, id })),
              { type: "Organization" as const, id: "LIST" },
            ]
          : [{ type: "Organization" as const, id: "LIST" }],
    }),
    getOrganizationById: builder.query<any, string | number>({
      query: (id) => "/organizations/${id}",
      providesTags: (result, error, id) => [{ type: "Organization", id }],
    }),
    createOrganization: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/organizations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Organization", id: "LIST" }],
    }),
    updateOrganization: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/organizations/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Organization", id },
        { type: "Organization", id: "LIST" },
      ],
    }),
    deleteOrganization: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/organizations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Organization", id },
        { type: "Organization", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationApi;
