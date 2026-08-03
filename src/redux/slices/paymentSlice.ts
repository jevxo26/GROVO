import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery,
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    getAllPayments: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/payments", params } : "/payments"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Payment" as const, id })),
              { type: "Payment" as const, id: "LIST" },
            ]
          : [{ type: "Payment" as const, id: "LIST" }],
    }),
    getPaymentsByDonationId: builder.query<any, string | number>({
      query: (donationId) => `/payments/donation/${donationId}`,
      providesTags: [{ type: "Payment", id: "DONATION_LIST" }],
    }),
    getPaymentByTransactionId: builder.query<any, string>({
      query: (transactionId) => `/payments/transaction/${transactionId}`,
      providesTags: (result, error, transactionId) => [{ type: "Payment", id: transactionId }],
    }),
    getPaymentById: builder.query<any, string | number>({
      query: (id) => `/payments/${id}`,
      providesTags: (result, error, id) => [{ type: "Payment", id }],
    }),
    initiatePayment: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/payments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Payment", id: "LIST" }],
    }),
    updatePaymentStatus: builder.mutation<any, { id: string | number; status: string }>({
      query: ({ id, status }) => ({
        url: `/payments/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Payment", id },
        { type: "Payment", id: "LIST" },
      ],
    }),
    deletePayment: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Payment", id },
        { type: "Payment", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentsByDonationIdQuery,
  useGetPaymentByTransactionIdQuery,
  useGetPaymentByIdQuery,
  useInitiatePaymentMutation,
  useUpdatePaymentStatusMutation,
  useDeletePaymentMutation,
} = paymentApi;
