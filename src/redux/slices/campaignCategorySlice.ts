import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface CampaignCategoryData {
  id: string | number;
  [key: string]: any;
}

export interface CampaignCategoryResponse {
  success: boolean;
  message: string;
  data: CampaignCategoryData | CampaignCategoryData[];
}

export const campaignCategoryApi = createApi({
  reducerPath: "campaignCategoryApi",
  baseQuery,
  tagTypes: ["CampaignCategory"],
  endpoints: (builder) => ({
    getAllCampaignCategorys: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/campaign-categories", params } : "/campaign-categories"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "CampaignCategory" as const, id })),
              { type: "CampaignCategory" as const, id: "LIST" },
            ]
          : [{ type: "CampaignCategory" as const, id: "LIST" }],
    }),
    getCampaignCategoryById: builder.query<any, string | number>({
      query: (id) => "/campaign-categories/${id}",
      providesTags: (result, error, id) => [{ type: "CampaignCategory", id }],
    }),
    createCampaignCategory: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/campaign-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "CampaignCategory", id: "LIST" }],
    }),
    updateCampaignCategory: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/campaign-categories/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CampaignCategory", id },
        { type: "CampaignCategory", id: "LIST" },
      ],
    }),
    deleteCampaignCategory: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/campaign-categories/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CampaignCategory", id },
        { type: "CampaignCategory", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllCampaignCategorysQuery,
  useGetCampaignCategoryByIdQuery,
  useCreateCampaignCategoryMutation,
  useUpdateCampaignCategoryMutation,
  useDeleteCampaignCategoryMutation,
} = campaignCategoryApi;
