import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface CampaignGoalData {
  id: string | number;
  [key: string]: any;
}

export interface CampaignGoalResponse {
  success: boolean;
  message: string;
  data: CampaignGoalData | CampaignGoalData[];
}

export const campaignGoalApi = createApi({
  reducerPath: "campaignGoalApi",
  baseQuery,
  tagTypes: ["CampaignGoal"],
  endpoints: (builder) => ({
    getAllCampaignGoals: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/campaign-goals", params } : "/campaign-goals"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "CampaignGoal" as const, id })),
              { type: "CampaignGoal" as const, id: "LIST" },
            ]
          : [{ type: "CampaignGoal" as const, id: "LIST" }],
    }),
    getCampaignGoalById: builder.query<any, string | number>({
      query: (id) => "/campaign-goals/${id}",
      providesTags: (result, error, id) => [{ type: "CampaignGoal", id }],
    }),
    createCampaignGoal: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/campaign-goals",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "CampaignGoal", id: "LIST" }],
    }),
    updateCampaignGoal: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/campaign-goals/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CampaignGoal", id },
        { type: "CampaignGoal", id: "LIST" },
      ],
    }),
    deleteCampaignGoal: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/campaign-goals/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "CampaignGoal", id },
        { type: "CampaignGoal", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllCampaignGoalsQuery,
  useGetCampaignGoalByIdQuery,
  useCreateCampaignGoalMutation,
  useUpdateCampaignGoalMutation,
  useDeleteCampaignGoalMutation,
} = campaignGoalApi;
