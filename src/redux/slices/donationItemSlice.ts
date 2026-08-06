import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface DonationItemData {
  id: string | number;
  [key: string]: any;
}

export interface DonationItemResponse {
  success: boolean;
  message: string;
  data: DonationItemData | DonationItemData[];
}

export const donationItemApi = createApi({
  reducerPath: "donationItemApi",
  baseQuery,
  tagTypes: ["DonationItem"],
  endpoints: (builder) => ({
    getAllDonationItems: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/donation-items", params } : "/donation-items"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "DonationItem" as const, id })),
              { type: "DonationItem" as const, id: "LIST" },
            ]
          : [{ type: "DonationItem" as const, id: "LIST" }],
    }),
    getDonationItemById: builder.query<any, string | number>({
      query: (id) => "/donation-items/${id}",
      providesTags: (result, error, id) => [{ type: "DonationItem", id }],
    }),
    createDonationItem: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/donation-items",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "DonationItem", id: "LIST" }],
    }),
    updateDonationItem: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/donation-items/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "DonationItem", id },
        { type: "DonationItem", id: "LIST" },
      ],
    }),
    deleteDonationItem: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/donation-items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "DonationItem", id },
        { type: "DonationItem", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllDonationItemsQuery,
  useGetDonationItemByIdQuery,
  useCreateDonationItemMutation,
  useUpdateDonationItemMutation,
  useDeleteDonationItemMutation,
} = donationItemApi;
