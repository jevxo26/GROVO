import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface DonationInstallmentData {
  id: string | number;
  [key: string]: any;
}

export interface DonationInstallmentResponse {
  success: boolean;
  message: string;
  data: DonationInstallmentData | DonationInstallmentData[];
}

export const donationInstallmentApi = createApi({
  reducerPath: "donationInstallmentApi",
  baseQuery,
  tagTypes: ["DonationInstallment"],
  endpoints: (builder) => ({
    getAllDonationInstallments: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/donation-installments", params } : "/donation-installments"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "DonationInstallment" as const, id })),
              { type: "DonationInstallment" as const, id: "LIST" },
            ]
          : [{ type: "DonationInstallment" as const, id: "LIST" }],
    }),
    getDonationInstallmentById: builder.query<any, string | number>({
      query: (id) => "/donation-installments/${id}",
      providesTags: (result, error, id) => [{ type: "DonationInstallment", id }],
    }),
    createDonationInstallment: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/donation-installments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "DonationInstallment", id: "LIST" }],
    }),
    updateDonationInstallment: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/donation-installments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "DonationInstallment", id },
        { type: "DonationInstallment", id: "LIST" },
      ],
    }),
    deleteDonationInstallment: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/donation-installments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "DonationInstallment", id },
        { type: "DonationInstallment", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllDonationInstallmentsQuery,
  useGetDonationInstallmentByIdQuery,
  useCreateDonationInstallmentMutation,
  useUpdateDonationInstallmentMutation,
  useDeleteDonationInstallmentMutation,
} = donationInstallmentApi;
