import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface PaymentTransactionData {
  id: string | number;
  [key: string]: any;
}

export interface PaymentTransactionResponse {
  success: boolean;
  message: string;
  data: PaymentTransactionData | PaymentTransactionData[];
}

export const paymentTransactionApi = createApi({
  reducerPath: "paymentTransactionApi",
  baseQuery,
  tagTypes: ["PaymentTransaction"],
  endpoints: (builder) => ({
    getAllPaymentTransactions: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/payment-transactions", params } : "/payment-transactions"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "PaymentTransaction" as const, id })),
              { type: "PaymentTransaction" as const, id: "LIST" },
            ]
          : [{ type: "PaymentTransaction" as const, id: "LIST" }],
    }),
    getPaymentTransactionById: builder.query<any, string | number>({
      query: (id) => "/payment-transactions/${id}",
      providesTags: (result, error, id) => [{ type: "PaymentTransaction", id }],
    }),
    createPaymentTransaction: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/payment-transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "PaymentTransaction", id: "LIST" }],
    }),
    updatePaymentTransaction: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/payment-transactions/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PaymentTransaction", id },
        { type: "PaymentTransaction", id: "LIST" },
      ],
    }),
    deletePaymentTransaction: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/payment-transactions/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "PaymentTransaction", id },
        { type: "PaymentTransaction", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllPaymentTransactionsQuery,
  useGetPaymentTransactionByIdQuery,
  useCreatePaymentTransactionMutation,
  useUpdatePaymentTransactionMutation,
  useDeletePaymentTransactionMutation,
} = paymentTransactionApi;
