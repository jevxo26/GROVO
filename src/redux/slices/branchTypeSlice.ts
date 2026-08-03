import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchTypeData {
  id: string | number;
  [key: string]: any;
}

export interface BranchTypeResponse {
  success: boolean;
  message: string;
  data: BranchTypeData | BranchTypeData[];
}

export const branchTypeApi = createApi({
  reducerPath: "branchTypeApi",
  baseQuery,
  tagTypes: ["BranchType"],
  endpoints: (builder) => ({
    getAllBranchTypes: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-types", params } : "/branch-types"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchType" as const, id })),
              { type: "BranchType" as const, id: "LIST" },
            ]
          : [{ type: "BranchType" as const, id: "LIST" }],
    }),
    getBranchTypeById: builder.query<any, string | number>({
      query: (id) => "/branch-types/${id}",
      providesTags: (result, error, id) => [{ type: "BranchType", id }],
    }),
    createBranchType: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-types",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchType", id: "LIST" }],
    }),
    updateBranchType: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/branch-types/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchType", id },
        { type: "BranchType", id: "LIST" },
      ],
    }),
    deleteBranchType: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/branch-types/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchType", id },
        { type: "BranchType", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchTypesQuery,
  useGetBranchTypeByIdQuery,
  useCreateBranchTypeMutation,
  useUpdateBranchTypeMutation,
  useDeleteBranchTypeMutation,
} = branchTypeApi;
