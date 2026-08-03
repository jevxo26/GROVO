import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchTargetData {
  id: string | number;
  [key: string]: any;
}

export interface BranchTargetResponse {
  success: boolean;
  message: string;
  data: BranchTargetData | BranchTargetData[];
}

export const branchTargetApi = createApi({
  reducerPath: "branchTargetApi",
  baseQuery,
  tagTypes: ["BranchTarget"],
  endpoints: (builder) => ({
    getAllBranchTargets: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-targets", params } : "/branch-targets"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchTarget" as const, id })),
              { type: "BranchTarget" as const, id: "LIST" },
            ]
          : [{ type: "BranchTarget" as const, id: "LIST" }],
    }),
    getBranchTargetById: builder.query<any, string | number>({
      query: (id) => "/branch-targets/${id}",
      providesTags: (result, error, id) => [{ type: "BranchTarget", id }],
    }),
    createBranchTarget: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-targets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchTarget", id: "LIST" }],
    }),
    updateBranchTarget: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/branch-targets/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchTarget", id },
        { type: "BranchTarget", id: "LIST" },
      ],
    }),
    deleteBranchTarget: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/branch-targets/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchTarget", id },
        { type: "BranchTarget", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchTargetsQuery,
  useGetBranchTargetByIdQuery,
  useCreateBranchTargetMutation,
  useUpdateBranchTargetMutation,
  useDeleteBranchTargetMutation,
} = branchTargetApi;
