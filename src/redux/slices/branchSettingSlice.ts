import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchSettingData {
  id: string | number;
  [key: string]: any;
}

export interface BranchSettingResponse {
  success: boolean;
  message: string;
  data: BranchSettingData | BranchSettingData[];
}

export const branchSettingApi = createApi({
  reducerPath: "branchSettingApi",
  baseQuery,
  tagTypes: ["BranchSetting"],
  endpoints: (builder) => ({
    getAllBranchSettings: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-settings", params } : "/branch-settings"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchSetting" as const, id })),
              { type: "BranchSetting" as const, id: "LIST" },
            ]
          : [{ type: "BranchSetting" as const, id: "LIST" }],
    }),
    getBranchSettingById: builder.query<any, string | number>({
      query: (id) => "/branch-settings/${id}",
      providesTags: (result, error, id) => [{ type: "BranchSetting", id }],
    }),
    createBranchSetting: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-settings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchSetting", id: "LIST" }],
    }),
    updateBranchSetting: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/branch-settings/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchSetting", id },
        { type: "BranchSetting", id: "LIST" },
      ],
    }),
    deleteBranchSetting: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/branch-settings/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchSetting", id },
        { type: "BranchSetting", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchSettingsQuery,
  useGetBranchSettingByIdQuery,
  useCreateBranchSettingMutation,
  useUpdateBranchSettingMutation,
  useDeleteBranchSettingMutation,
} = branchSettingApi;
