import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    data: any[]; // using any to bypass strict type matching of campaign db entity mapping
  };
}

export interface SingleCampaignResponse {
  success: boolean;
  message: string;
  data: any;
}

export const campaignCategoriesApi = createApi({
  reducerPath: "campaignCategoriesApi",
  baseQuery: fetchBaseQuery({
    // fallback base url corresponding to next public api url
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
    prepareHeaders: (headers) => {
      // Add auth token if needed
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("authToken");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Campaign"],
  endpoints: (builder) => ({
    // GET all campaign categories (or campaigns in this case)
    getCampaignCategories: builder.query<CampaignProps[], void>({
      query: () => "/campaigns",
      transformResponse: (response: CampaignResponse): CampaignProps[] => {
        // Map backend Campaign model to CampaignProps structure required by frontend
        return response?.data?.data || [];
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Campaign" as const, id })),
              { type: "Campaign" as const, id: "LIST" },
            ]
          : [{ type: "Campaign" as const, id: "LIST" }],
    }),

    // POST create new campaign category
    createCampaignCategory: builder.mutation<
      CampaignProps,
      Partial<CampaignProps>
    >({
      query: (newCategory) => ({
        url: "/campaigns",
        method: "POST",
        body: newCategory,
      }),
      transformResponse: (response: SingleCampaignResponse) => response.data,
      invalidatesTags: [{ type: "Campaign", id: "LIST" }],
    }),

    // PATCH update campaign category
    updateCampaignCategory: builder.mutation<
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

    // DELETE campaign category
    deleteCampaignCategory: builder.mutation<{ message: string }, string>({
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
  useCreateCampaignCategoryMutation,
  useUpdateCampaignCategoryMutation,
  useDeleteCampaignCategoryMutation,
} = campaignCategoriesApi;
