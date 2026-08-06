import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface CampaignMediaData {
  id: string | number;
  [key: string]: any;
}

export interface CampaignMediaResponse {
  success: boolean;
  message: string;
  data: CampaignMediaData | CampaignMediaData[];
}

export const campaignMediaApi = createApi({
  reducerPath: "campaignMediaApi",
  baseQuery,
  tagTypes: ["CampaignMedia"],
  endpoints: (builder) => ({
    getAllCampaignMedias: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/campaign-media", params } : "/campaign-media"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "CampaignMedia" as const, id })),
              { type: "CampaignMedia" as const, id: "LIST" },
            ]
          : [{ type: "CampaignMedia" as const, id: "LIST" }],
    }),
    getCampaignMediaById: builder.query<any, string | number>({
      query: (id) => "/campaign-media/${id}",
      providesTags: (result, error, id) => [{ type: "CampaignMedia", id }],
    }),
    createCampaignMedia: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/campaign-media",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "CampaignMedia", id: "LIST" }],
    }),
    updateCampaignMedia: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/campaign-media/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CampaignMedia", id },
        { type: "CampaignMedia", id: "LIST" },
      ],
    }),
    deleteCampaignMedia: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/campaign-media/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CampaignMedia", id },
        { type: "CampaignMedia", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllCampaignMediasQuery,
  useGetCampaignMediaByIdQuery,
  useCreateCampaignMediaMutation,
  useUpdateCampaignMediaMutation,
  useDeleteCampaignMediaMutation,
} = campaignMediaApi;
