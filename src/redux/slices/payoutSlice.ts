import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface PayoutData {
  id: string | number;
  [key: string]: any;
}

export interface PayoutResponse {
  success: boolean;
  message: string;
  data: PayoutData | PayoutData[];
}

export const payoutApi = createApi({
  reducerPath: "payoutApi",
  baseQuery,
  tagTypes: ["Payout"],
  endpoints: (builder) => ({
    getAllPayouts: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/payouts", params } : "/payouts"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Payout" as const, id })),
              { type: "Payout" as const, id: "LIST" },
            ]
          : [{ type: "Payout" as const, id: "LIST" }],
    }),
    getPayoutById: builder.query<any, string | number>({
      query: (id) => "/payouts/${id}",
      providesTags: (result, error, id) => [{ type: "Payout", id }],
    }),
    createPayout: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/payouts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Payout", id: "LIST" }],
    }),
    updatePayout: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/payouts/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Payout", id },
        { type: "Payout", id: "LIST" },
      ],
    }),
    deletePayout: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/payouts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Payout", id },
        { type: "Payout", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllPayoutsQuery,
  useGetPayoutByIdQuery,
  useCreatePayoutMutation,
  useUpdatePayoutMutation,
  useDeletePayoutMutation,
} = payoutApi;
