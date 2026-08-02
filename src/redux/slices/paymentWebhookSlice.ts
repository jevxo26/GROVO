import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface PaymentWebhookData {
  id: string | number;
  [key: string]: any;
}

export interface PaymentWebhookResponse {
  success: boolean;
  message: string;
  data: PaymentWebhookData | PaymentWebhookData[];
}

export const paymentWebhookApi = createApi({
  reducerPath: "paymentWebhookApi",
  baseQuery,
  tagTypes: ["PaymentWebhook"],
  endpoints: (builder) => ({
    getAllPaymentWebhooks: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/payment-webhooks", params } : "/payment-webhooks"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "PaymentWebhook" as const, id })),
              { type: "PaymentWebhook" as const, id: "LIST" },
            ]
          : [{ type: "PaymentWebhook" as const, id: "LIST" }],
    }),
    getPaymentWebhookById: builder.query<any, string | number>({
      query: (id) => "/payment-webhooks/${id}",
      providesTags: (result, error, id) => [{ type: "PaymentWebhook", id }],
    }),
    createPaymentWebhook: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/payment-webhooks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "PaymentWebhook", id: "LIST" }],
    }),
    updatePaymentWebhook: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/payment-webhooks/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PaymentWebhook", id },
        { type: "PaymentWebhook", id: "LIST" },
      ],
    }),
    deletePaymentWebhook: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/payment-webhooks/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "PaymentWebhook", id },
        { type: "PaymentWebhook", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllPaymentWebhooksQuery,
  useGetPaymentWebhookByIdQuery,
  useCreatePaymentWebhookMutation,
  useUpdatePaymentWebhookMutation,
  useDeletePaymentWebhookMutation,
} = paymentWebhookApi;
