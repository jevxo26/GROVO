import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface EmergencyCampaignData {
  id: string | number;
  [key: string]: any;
}

export interface EmergencyCampaignResponse {
  success: boolean;
  message: string;
  data: EmergencyCampaignData | EmergencyCampaignData[];
}

export const emergencyCampaignApi = createApi({
  reducerPath: "emergencyCampaignApi",
  baseQuery,
  tagTypes: ["EmergencyCampaign"],
  endpoints: (builder) => ({
    getAllEmergencyCampaigns: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/emergency-campaigns", params } : "/emergency-campaigns"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "EmergencyCampaign" as const, id })),
              { type: "EmergencyCampaign" as const, id: "LIST" },
            ]
          : [{ type: "EmergencyCampaign" as const, id: "LIST" }],
    }),
    getEmergencyCampaignById: builder.query<any, string | number>({
      query: (id) => "/emergency-campaigns/${id}",
      providesTags: (result, error, id) => [{ type: "EmergencyCampaign", id }],
    }),
    createEmergencyCampaign: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/emergency-campaigns",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "EmergencyCampaign", id: "LIST" }],
    }),
    updateEmergencyCampaign: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/emergency-campaigns/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "EmergencyCampaign", id },
        { type: "EmergencyCampaign", id: "LIST" },
      ],
    }),
    deleteEmergencyCampaign: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/emergency-campaigns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "EmergencyCampaign", id },
        { type: "EmergencyCampaign", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllEmergencyCampaignsQuery,
  useGetEmergencyCampaignByIdQuery,
  useCreateEmergencyCampaignMutation,
  useUpdateEmergencyCampaignMutation,
  useDeleteEmergencyCampaignMutation,
} = emergencyCampaignApi;
