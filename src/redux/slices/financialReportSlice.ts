import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface FinancialReportData {
  id: string | number;
  [key: string]: any;
}

export interface FinancialReportResponse {
  success: boolean;
  message: string;
  data: FinancialReportData | FinancialReportData[];
}

export const financialReportApi = createApi({
  reducerPath: "financialReportApi",
  baseQuery,
  tagTypes: ["FinancialReport"],
  endpoints: (builder) => ({
    getAllFinancialReports: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/financial-reports", params } : "/financial-reports"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "FinancialReport" as const, id })),
              { type: "FinancialReport" as const, id: "LIST" },
            ]
          : [{ type: "FinancialReport" as const, id: "LIST" }],
    }),
    getFinancialReportById: builder.query<any, string | number>({
      query: (id) => "/financial-reports/${id}",
      providesTags: (result, error, id) => [{ type: "FinancialReport", id }],
    }),
    createFinancialReport: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/financial-reports",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "FinancialReport", id: "LIST" }],
    }),
    updateFinancialReport: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/financial-reports/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "FinancialReport", id },
        { type: "FinancialReport", id: "LIST" },
      ],
    }),
    deleteFinancialReport: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/financial-reports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "FinancialReport", id },
        { type: "FinancialReport", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllFinancialReportsQuery,
  useGetFinancialReportByIdQuery,
  useCreateFinancialReportMutation,
  useUpdateFinancialReportMutation,
  useDeleteFinancialReportMutation,
} = financialReportApi;
