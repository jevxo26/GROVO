import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface DonationReceiptData {
  id: string | number;
  [key: string]: any;
}

export interface DonationReceiptResponse {
  success: boolean;
  message: string;
  data: DonationReceiptData | DonationReceiptData[];
}

export const donationReceiptApi = createApi({
  reducerPath: "donationReceiptApi",
  baseQuery,
  tagTypes: ["DonationReceipt"],
  endpoints: (builder) => ({
    getAllDonationReceipts: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/donation-receipts", params } : "/donation-receipts"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "DonationReceipt" as const, id })),
              { type: "DonationReceipt" as const, id: "LIST" },
            ]
          : [{ type: "DonationReceipt" as const, id: "LIST" }],
    }),
    getDonationReceiptById: builder.query<any, string | number>({
      query: (id) => "/donation-receipts/${id}",
      providesTags: (result, error, id) => [{ type: "DonationReceipt", id }],
    }),
    createDonationReceipt: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/donation-receipts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "DonationReceipt", id: "LIST" }],
    }),
    updateDonationReceipt: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/donation-receipts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "DonationReceipt", id },
        { type: "DonationReceipt", id: "LIST" },
      ],
    }),
    deleteDonationReceipt: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/donation-receipts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "DonationReceipt", id },
        { type: "DonationReceipt", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllDonationReceiptsQuery,
  useGetDonationReceiptByIdQuery,
  useCreateDonationReceiptMutation,
  useUpdateDonationReceiptMutation,
  useDeleteDonationReceiptMutation,
} = donationReceiptApi;
