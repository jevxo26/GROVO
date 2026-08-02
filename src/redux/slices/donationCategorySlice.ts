import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface DonationCategoryData {
  id: string | number;
  [key: string]: any;
}

export interface DonationCategoryResponse {
  success: boolean;
  message: string;
  data: DonationCategoryData | DonationCategoryData[];
}

export const donationCategoryApi = createApi({
  reducerPath: "donationCategoryApi",
  baseQuery,
  tagTypes: ["DonationCategory"],
  endpoints: (builder) => ({
    getAllDonationCategorys: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/donation-categories", params } : "/donation-categories"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "DonationCategory" as const, id })),
              { type: "DonationCategory" as const, id: "LIST" },
            ]
          : [{ type: "DonationCategory" as const, id: "LIST" }],
    }),
    getDonationCategoryById: builder.query<any, string | number>({
      query: (id) => "/donation-categories/${id}",
      providesTags: (result, error, id) => [{ type: "DonationCategory", id }],
    }),
    createDonationCategory: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/donation-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "DonationCategory", id: "LIST" }],
    }),
    updateDonationCategory: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/donation-categories/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "DonationCategory", id },
        { type: "DonationCategory", id: "LIST" },
      ],
    }),
    deleteDonationCategory: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/donation-categories/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "DonationCategory", id },
        { type: "DonationCategory", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllDonationCategorysQuery,
  useGetDonationCategoryByIdQuery,
  useCreateDonationCategoryMutation,
  useUpdateDonationCategoryMutation,
  useDeleteDonationCategoryMutation,
} = donationCategoryApi;
