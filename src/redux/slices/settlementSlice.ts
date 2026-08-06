import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface SettlementData {
  id: string | number;
  [key: string]: any;
}

export interface SettlementResponse {
  success: boolean;
  message: string;
  data: SettlementData | SettlementData[];
}

export const settlementApi = createApi({
  reducerPath: "settlementApi",
  baseQuery,
  tagTypes: ["Settlement"],
  endpoints: (builder) => ({
    getAllSettlements: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/settlements", params } : "/settlements"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Settlement" as const, id })),
              { type: "Settlement" as const, id: "LIST" },
            ]
          : [{ type: "Settlement" as const, id: "LIST" }],
    }),
    getSettlementById: builder.query<any, string | number>({
      query: (id) => "/settlements/${id}",
      providesTags: (result, error, id) => [{ type: "Settlement", id }],
    }),
    createSettlement: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/settlements",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Settlement", id: "LIST" }],
    }),
    updateSettlement: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/settlements/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Settlement", id },
        { type: "Settlement", id: "LIST" },
      ],
    }),
    deleteSettlement: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/settlements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Settlement", id },
        { type: "Settlement", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllSettlementsQuery,
  useGetSettlementByIdQuery,
  useCreateSettlementMutation,
  useUpdateSettlementMutation,
  useDeleteSettlementMutation,
} = settlementApi;
