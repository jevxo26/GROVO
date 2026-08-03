import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const donationApi = createApi({
  reducerPath: "donationApi",
  baseQuery,
  tagTypes: ["Donation"],
  endpoints: (builder) => ({
    getAllDonations: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/donations", params } : "/donations"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Donation" as const, id })),
              { type: "Donation" as const, id: "LIST" },
            ]
          : [{ type: "Donation" as const, id: "LIST" }],
    }),
    getDonationStats: builder.query<any, void>({
      query: () => "/donations/stats",
      providesTags: [{ type: "Donation", id: "STATS" }],
    }),
    getDonationByNumber: builder.query<any, string>({
      query: (number) => `/donations/number/${number}`,
      providesTags: (result, error, number) => [{ type: "Donation", id: number }],
    }),
    getDonationById: builder.query<any, string | number>({
      query: (id) => `/donations/${id}`,
      providesTags: (result, error, id) => [{ type: "Donation", id }],
    }),
    createDonation: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/donations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Donation", id: "LIST" }],
    }),
    updateDonation: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/donations/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Donation", id },
        { type: "Donation", id: "LIST" },
      ],
    }),
    deleteDonation: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/donations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Donation", id },
        { type: "Donation", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllDonationsQuery,
  useGetDonationStatsQuery,
  useGetDonationByNumberQuery,
  useGetDonationByIdQuery,
  useCreateDonationMutation,
  useUpdateDonationMutation,
  useDeleteDonationMutation,
} = donationApi;
