import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface RefundData {
  id: string | number;
  [key: string]: any;
}

export interface RefundResponse {
  success: boolean;
  message: string;
  data: RefundData | RefundData[];
}

export const refundApi = createApi({
  reducerPath: "refundApi",
  baseQuery,
  tagTypes: ["Refund"],
  endpoints: (builder) => ({
    getAllRefunds: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/refunds", params } : "/refunds"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Refund" as const, id })),
              { type: "Refund" as const, id: "LIST" },
            ]
          : [{ type: "Refund" as const, id: "LIST" }],
    }),
    getRefundById: builder.query<any, string | number>({
      query: (id) => "/refunds/${id}",
      providesTags: (result, error, id) => [{ type: "Refund", id }],
    }),
    createRefund: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/refunds",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Refund", id: "LIST" }],
    }),
    updateRefund: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/refunds/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Refund", id },
        { type: "Refund", id: "LIST" },
      ],
    }),
    deleteRefund: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/refunds/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Refund", id },
        { type: "Refund", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllRefundsQuery,
  useGetRefundByIdQuery,
  useCreateRefundMutation,
  useUpdateRefundMutation,
  useDeleteRefundMutation,
} = refundApi;
