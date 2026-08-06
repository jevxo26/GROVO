import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface FundAllocationData {
  id: string | number;
  [key: string]: any;
}

export interface FundAllocationResponse {
  success: boolean;
  message: string;
  data: FundAllocationData | FundAllocationData[];
}

export const fundAllocationApi = createApi({
  reducerPath: "fundAllocationApi",
  baseQuery,
  tagTypes: ["FundAllocation"],
  endpoints: (builder) => ({
    getAllFundAllocations: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/fund-allocations", params } : "/fund-allocations"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "FundAllocation" as const, id })),
              { type: "FundAllocation" as const, id: "LIST" },
            ]
          : [{ type: "FundAllocation" as const, id: "LIST" }],
    }),
    getFundAllocationById: builder.query<any, string | number>({
      query: (id) => "/fund-allocations/${id}",
      providesTags: (result, error, id) => [{ type: "FundAllocation", id }],
    }),
    createFundAllocation: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/fund-allocations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "FundAllocation", id: "LIST" }],
    }),
    updateFundAllocation: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/fund-allocations/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "FundAllocation", id },
        { type: "FundAllocation", id: "LIST" },
      ],
    }),
    deleteFundAllocation: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/fund-allocations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "FundAllocation", id },
        { type: "FundAllocation", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllFundAllocationsQuery,
  useGetFundAllocationByIdQuery,
  useCreateFundAllocationMutation,
  useUpdateFundAllocationMutation,
  useDeleteFundAllocationMutation,
} = fundAllocationApi;
