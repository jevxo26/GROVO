import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface CampaignProps {
  id: number | string;
  image: string;
  category: string;
  isUrgent?: boolean;
  raised: string;
  goal: string;
  title: string;
  description: string;
  percentage: number;
  daysLeft: number;
  helpedCount: string;
}

export interface CampaignResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: any[];
  };
}

export interface SingleCampaignResponse {
  success: boolean;
  message: string;
  data: any;
}

export const campaignCategoriesApi = createApi({
  reducerPath: "campaignCategoriesApi",
  baseQuery,
  tagTypes: ["Campaign"],
  endpoints: (builder) => ({
    getCampaignCategories: builder.query<CampaignProps[], void>({
      query: () => "/campaigns",
      transformResponse: (response: CampaignResponse): CampaignProps[] => {
        const campaignsList = response?.data?.data || [];
        return campaignsList.map((campaign: any) => {
          const end = new Date(campaign.endDate).getTime();
          const now = new Date().getTime();
          const diff = end - now;
          const daysLeft =
            diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;

          return {
            id: campaign.id,
            image:
              campaign.thumbnail ||
              campaign.banner ||
              "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
            category: campaign.category?.name || "HUMANITARIAN",
            isUrgent: campaign.campaignType === "EMERGENCY",
            raised: `BDT ${Math.round(campaign.raisedAmount / 1000)}K`,
            goal: `BDT ${Math.round(campaign.targetAmount / 1000)}K`,
            title: campaign.title,
            description: campaign.shortDescription || campaign.description,
            percentage:
              campaign.targetAmount > 0
                ? Math.round(
                    (campaign.raisedAmount / campaign.targetAmount) * 100,
                  )
                : 0,
            daysLeft,
            helpedCount: campaign._count?.donations
              ? String(campaign._count.donations)
              : "0",
          };
        });
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Campaign" as const, id })),
              { type: "Campaign" as const, id: "LIST" },
            ]
          : [{ type: "Campaign" as const, id: "LIST" }],
    }),
    getCampaignStats: builder.query<any, void>({
      query: () => "/campaigns/stats",
      providesTags: [{ type: "Campaign", id: "STATS" }],
    }),
    getCampaignBySlug: builder.query<any, string>({
      query: (slug) => `/campaigns/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Campaign", id: slug }],
    }),
    getCampaignById: builder.query<any, string | number>({
      query: (id) => `/campaigns/${id}`,
      providesTags: (result, error, id) => [{ type: "Campaign", id }],
    }),
    createCampaign: builder.mutation<CampaignProps, Partial<CampaignProps>>({
      query: (newCampaign) => ({
        url: "/campaigns",
        method: "POST",
        body: newCampaign,
      }),
      transformResponse: (response: SingleCampaignResponse) => response.data,
      invalidatesTags: [{ type: "Campaign", id: "LIST" }],
    }),
    updateCampaign: builder.mutation<
      CampaignProps,
      { id: string; data: Partial<CampaignProps> }
    >({
      query: ({ id, data }) => ({
        url: `/campaigns/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: SingleCampaignResponse) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "Campaign", id },
        { type: "Campaign", id: "LIST" },
      ],
    }),
    deleteCampaign: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/campaigns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Campaign", id },
        { type: "Campaign", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCampaignCategoriesQuery,
  useGetCampaignStatsQuery,
  useGetCampaignBySlugQuery,
  useGetCampaignByIdQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} = campaignCategoriesApi;
