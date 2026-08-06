import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface PaymentLogData {
  id: string | number;
  [key: string]: any;
}

export interface PaymentLogResponse {
  success: boolean;
  message: string;
  data: PaymentLogData | PaymentLogData[];
}

export const paymentLogApi = createApi({
  reducerPath: "paymentLogApi",
  baseQuery,
  tagTypes: ["PaymentLog"],
  endpoints: (builder) => ({
    getAllPaymentLogs: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/payment-logs", params } : "/payment-logs"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "PaymentLog" as const, id })),
              { type: "PaymentLog" as const, id: "LIST" },
            ]
          : [{ type: "PaymentLog" as const, id: "LIST" }],
    }),
    getPaymentLogById: builder.query<any, string | number>({
      query: (id) => "/payment-logs/${id}",
      providesTags: (result, error, id) => [{ type: "PaymentLog", id }],
    }),
    createPaymentLog: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/payment-logs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "PaymentLog", id: "LIST" }],
    }),
    updatePaymentLog: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/payment-logs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PaymentLog", id },
        { type: "PaymentLog", id: "LIST" },
      ],
    }),
    deletePaymentLog: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/payment-logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "PaymentLog", id },
        { type: "PaymentLog", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllPaymentLogsQuery,
  useGetPaymentLogByIdQuery,
  useCreatePaymentLogMutation,
  useUpdatePaymentLogMutation,
  useDeletePaymentLogMutation,
} = paymentLogApi;
