import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface OrganizationProfileData {
  id: string | number;
  [key: string]: any;
}

export interface OrganizationProfileResponse {
  success: boolean;
  message: string;
  data: OrganizationProfileData | OrganizationProfileData[];
}

export const organizationProfileApi = createApi({
  reducerPath: "organizationProfileApi",
  baseQuery,
  tagTypes: ["OrganizationProfile"],
  endpoints: (builder) => ({
    getAllOrganizationProfiles: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/organization-profiles", params } : "/organization-profiles"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "OrganizationProfile" as const, id })),
              { type: "OrganizationProfile" as const, id: "LIST" },
            ]
          : [{ type: "OrganizationProfile" as const, id: "LIST" }],
    }),
    getOrganizationProfileById: builder.query<any, string | number>({
      query: (id) => "/organization-profiles/${id}",
      providesTags: (result, error, id) => [{ type: "OrganizationProfile", id }],
    }),
    createOrganizationProfile: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/organization-profiles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "OrganizationProfile", id: "LIST" }],
    }),
    updateOrganizationProfile: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/organization-profiles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "OrganizationProfile", id },
        { type: "OrganizationProfile", id: "LIST" },
      ],
    }),
    deleteOrganizationProfile: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/organization-profiles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "OrganizationProfile", id },
        { type: "OrganizationProfile", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllOrganizationProfilesQuery,
  useGetOrganizationProfileByIdQuery,
  useCreateOrganizationProfileMutation,
  useUpdateOrganizationProfileMutation,
  useDeleteOrganizationProfileMutation,
} = organizationProfileApi;
