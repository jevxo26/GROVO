import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface OrganizationHierarchyData {
  id: string | number;
  [key: string]: any;
}

export interface OrganizationHierarchyResponse {
  success: boolean;
  message: string;
  data: OrganizationHierarchyData | OrganizationHierarchyData[];
}

export const organizationHierarchyApi = createApi({
  reducerPath: "organizationHierarchyApi",
  baseQuery,
  tagTypes: ["OrganizationHierarchy"],
  endpoints: (builder) => ({
    getAllOrganizationHierarchys: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/organization-hierarchies", params } : "/organization-hierarchies"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "OrganizationHierarchy" as const, id })),
              { type: "OrganizationHierarchy" as const, id: "LIST" },
            ]
          : [{ type: "OrganizationHierarchy" as const, id: "LIST" }],
    }),
    getOrganizationHierarchyById: builder.query<any, string | number>({
      query: (id) => "/organization-hierarchies/${id}",
      providesTags: (result, error, id) => [{ type: "OrganizationHierarchy", id }],
    }),
    createOrganizationHierarchy: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/organization-hierarchies",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "OrganizationHierarchy", id: "LIST" }],
    }),
    updateOrganizationHierarchy: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/organization-hierarchies/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "OrganizationHierarchy", id },
        { type: "OrganizationHierarchy", id: "LIST" },
      ],
    }),
    deleteOrganizationHierarchy: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/organization-hierarchies/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "OrganizationHierarchy", id },
        { type: "OrganizationHierarchy", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllOrganizationHierarchysQuery,
  useGetOrganizationHierarchyByIdQuery,
  useCreateOrganizationHierarchyMutation,
  useUpdateOrganizationHierarchyMutation,
  useDeleteOrganizationHierarchyMutation,
} = organizationHierarchyApi;
