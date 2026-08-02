import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface DonationScheduleData {
  id: string | number;
  [key: string]: any;
}

export interface DonationScheduleResponse {
  success: boolean;
  message: string;
  data: DonationScheduleData | DonationScheduleData[];
}

export const donationScheduleApi = createApi({
  reducerPath: "donationScheduleApi",
  baseQuery,
  tagTypes: ["DonationSchedule"],
  endpoints: (builder) => ({
    getAllDonationSchedules: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/donation-schedules", params } : "/donation-schedules"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "DonationSchedule" as const, id })),
              { type: "DonationSchedule" as const, id: "LIST" },
            ]
          : [{ type: "DonationSchedule" as const, id: "LIST" }],
    }),
    getDonationScheduleById: builder.query<any, string | number>({
      query: (id) => "/donation-schedules/${id}",
      providesTags: (result, error, id) => [{ type: "DonationSchedule", id }],
    }),
    createDonationSchedule: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/donation-schedules",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "DonationSchedule", id: "LIST" }],
    }),
    updateDonationSchedule: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/donation-schedules/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "DonationSchedule", id },
        { type: "DonationSchedule", id: "LIST" },
      ],
    }),
    deleteDonationSchedule: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/donation-schedules/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "DonationSchedule", id },
        { type: "DonationSchedule", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllDonationSchedulesQuery,
  useGetDonationScheduleByIdQuery,
  useCreateDonationScheduleMutation,
  useUpdateDonationScheduleMutation,
  useDeleteDonationScheduleMutation,
} = donationScheduleApi;
