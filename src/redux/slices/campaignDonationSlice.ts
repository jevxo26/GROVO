import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface CampaignDonationData {
  id: string | number;
  [key: string]: any;
}

export interface CampaignDonationResponse {
  success: boolean;
  message: string;
  data: CampaignDonationData | CampaignDonationData[];
}

export const campaignDonationApi = createApi({
  reducerPath: "campaignDonationApi",
  baseQuery,
  tagTypes: ["CampaignDonation"],
  endpoints: (builder) => ({
    getAllCampaignDonations: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/campaign-donations", params } : "/campaign-donations"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "CampaignDonation" as const, id })),
              { type: "CampaignDonation" as const, id: "LIST" },
            ]
          : [{ type: "CampaignDonation" as const, id: "LIST" }],
    }),
    getCampaignDonationById: builder.query<any, string | number>({
      query: (id) => "/campaign-donations/${id}",
      providesTags: (result, error, id) => [{ type: "CampaignDonation", id }],
    }),
    createCampaignDonation: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/campaign-donations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "CampaignDonation", id: "LIST" }],
    }),
    updateCampaignDonation: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/campaign-donations/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CampaignDonation", id },
        { type: "CampaignDonation", id: "LIST" },
      ],
    }),
    deleteCampaignDonation: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/campaign-donations/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CampaignDonation", id },
        { type: "CampaignDonation", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllCampaignDonationsQuery,
  useGetCampaignDonationByIdQuery,
  useCreateCampaignDonationMutation,
  useUpdateCampaignDonationMutation,
  useDeleteCampaignDonationMutation,
} = campaignDonationApi;
