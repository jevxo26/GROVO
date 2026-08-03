import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface PaymentGatewayData {
  id: string | number;
  [key: string]: any;
}

export interface PaymentGatewayResponse {
  success: boolean;
  message: string;
  data: PaymentGatewayData | PaymentGatewayData[];
}

export const paymentGatewayApi = createApi({
  reducerPath: "paymentGatewayApi",
  baseQuery,
  tagTypes: ["PaymentGateway"],
  endpoints: (builder) => ({
    getAllPaymentGateways: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/payment-gateways", params } : "/payment-gateways"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "PaymentGateway" as const, id })),
              { type: "PaymentGateway" as const, id: "LIST" },
            ]
          : [{ type: "PaymentGateway" as const, id: "LIST" }],
    }),
    getPaymentGatewayById: builder.query<any, string | number>({
      query: (id) => "/payment-gateways/${id}",
      providesTags: (result, error, id) => [{ type: "PaymentGateway", id }],
    }),
    createPaymentGateway: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/payment-gateways",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "PaymentGateway", id: "LIST" }],
    }),
    updatePaymentGateway: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/payment-gateways/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PaymentGateway", id },
        { type: "PaymentGateway", id: "LIST" },
      ],
    }),
    deletePaymentGateway: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/payment-gateways/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "PaymentGateway", id },
        { type: "PaymentGateway", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllPaymentGatewaysQuery,
  useGetPaymentGatewayByIdQuery,
  useCreatePaymentGatewayMutation,
  useUpdatePaymentGatewayMutation,
  useDeletePaymentGatewayMutation,
} = paymentGatewayApi;
