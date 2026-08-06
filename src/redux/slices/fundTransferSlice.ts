import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface FundTransferData {
  id: string | number;
  [key: string]: any;
}

export interface FundTransferResponse {
  success: boolean;
  message: string;
  data: FundTransferData | FundTransferData[];
}

export const fundTransferApi = createApi({
  reducerPath: "fundTransferApi",
  baseQuery,
  tagTypes: ["FundTransfer"],
  endpoints: (builder) => ({
    getAllFundTransfers: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/fund-transfers", params } : "/fund-transfers"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "FundTransfer" as const, id })),
              { type: "FundTransfer" as const, id: "LIST" },
            ]
          : [{ type: "FundTransfer" as const, id: "LIST" }],
    }),
    getFundTransferById: builder.query<any, string | number>({
      query: (id) => "/fund-transfers/${id}",
      providesTags: (result, error, id) => [{ type: "FundTransfer", id }],
    }),
    createFundTransfer: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/fund-transfers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "FundTransfer", id: "LIST" }],
    }),
    updateFundTransfer: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/fund-transfers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "FundTransfer", id },
        { type: "FundTransfer", id: "LIST" },
      ],
    }),
    deleteFundTransfer: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/fund-transfers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "FundTransfer", id },
        { type: "FundTransfer", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllFundTransfersQuery,
  useGetFundTransferByIdQuery,
  useCreateFundTransferMutation,
  useUpdateFundTransferMutation,
  useDeleteFundTransferMutation,
} = fundTransferApi;
