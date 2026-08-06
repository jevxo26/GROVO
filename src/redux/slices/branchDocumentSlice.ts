import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchDocumentData {
  id: string | number;
  [key: string]: any;
}

export interface BranchDocumentResponse {
  success: boolean;
  message: string;
  data: BranchDocumentData | BranchDocumentData[];
}

export const branchDocumentApi = createApi({
  reducerPath: "branchDocumentApi",
  baseQuery,
  tagTypes: ["BranchDocument"],
  endpoints: (builder) => ({
    getAllBranchDocuments: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-documents", params } : "/branch-documents"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchDocument" as const, id })),
              { type: "BranchDocument" as const, id: "LIST" },
            ]
          : [{ type: "BranchDocument" as const, id: "LIST" }],
    }),
    getBranchDocumentById: builder.query<any, string | number>({
      query: (id) => "/branch-documents/${id}",
      providesTags: (result, error, id) => [{ type: "BranchDocument", id }],
    }),
    createBranchDocument: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-documents",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchDocument", id: "LIST" }],
    }),
    updateBranchDocument: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/branch-documents/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchDocument", id },
        { type: "BranchDocument", id: "LIST" },
      ],
    }),
    deleteBranchDocument: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/branch-documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchDocument", id },
        { type: "BranchDocument", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchDocumentsQuery,
  useGetBranchDocumentByIdQuery,
  useCreateBranchDocumentMutation,
  useUpdateBranchDocumentMutation,
  useDeleteBranchDocumentMutation,
} = branchDocumentApi;
