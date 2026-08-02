import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface DonationTypeData {
  id: string | number;
  [key: string]: any;
}

export interface DonationTypeResponse {
  success: boolean;
  message: string;
  data: DonationTypeData | DonationTypeData[];
}

export const donationTypeApi = createApi({
  reducerPath: "donationTypeApi",
  baseQuery,
  tagTypes: ["DonationType"],
  endpoints: (builder) => ({
    getAllDonationTypes: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/donation-types", params } : "/donation-types"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "DonationType" as const, id })),
              { type: "DonationType" as const, id: "LIST" },
            ]
          : [{ type: "DonationType" as const, id: "LIST" }],
    }),
    getDonationTypeById: builder.query<any, string | number>({
      query: (id) => "/donation-types/${id}",
      providesTags: (result, error, id) => [{ type: "DonationType", id }],
    }),
    createDonationType: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/donation-types",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "DonationType", id: "LIST" }],
    }),
    updateDonationType: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/donation-types/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "DonationType", id },
        { type: "DonationType", id: "LIST" },
      ],
    }),
    deleteDonationType: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/donation-types/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "DonationType", id },
        { type: "DonationType", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllDonationTypesQuery,
  useGetDonationTypeByIdQuery,
  useCreateDonationTypeMutation,
  useUpdateDonationTypeMutation,
  useDeleteDonationTypeMutation,
} = donationTypeApi;
