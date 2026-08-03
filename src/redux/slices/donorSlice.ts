import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const donorApi = createApi({
  reducerPath: "donorApi",
  baseQuery,
  tagTypes: [
    "Donor", "IndividualDonor", "CorporateDonor", "DonorOrganization",
    "DonorSubscription", "DonationCommitment", "DonorWallet", "DonorTransaction",
    "MembershipFee", "MembershipPayment", "MembershipHistory", "DonorCertificate",
    "DonorBadge", "Referral", "ReferralReward", "DonorActivity", "DonorPreference"
  ],
  endpoints: (builder) => ({
    // Donors
    getAllDonors: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/donors/donors", params } : "/donors/donors"),
      providesTags: [{ type: "Donor", id: "LIST" }],
    }),
    getDonorById: builder.query<any, string | number>({
      query: (id) => `/donors/donors/${id}`,
      providesTags: (r, e, id) => [{ type: "Donor", id }],
    }),
    createDonor: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/donors/donors", method: "POST", body: data }),
      invalidatesTags: [{ type: "Donor", id: "LIST" }],
    }),
    updateDonor: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/donors/donors/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "Donor", id }, { type: "Donor", id: "LIST" }],
    }),
    deleteDonor: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/donors/donors/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Donor", id }, { type: "Donor", id: "LIST" }],
    }),

    // Individual Donors
    getAllIndividualDonors: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/donors/individual-donors", params } : "/donors/individual-donors"),
      providesTags: [{ type: "IndividualDonor", id: "LIST" }],
    }),
    getIndividualDonorById: builder.query<any, string | number>({
      query: (id) => `/donors/individual-donors/${id}`,
      providesTags: (r, e, id) => [{ type: "IndividualDonor", id }],
    }),
    createIndividualDonor: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/donors/individual-donors", method: "POST", body: data }),
      invalidatesTags: [{ type: "IndividualDonor", id: "LIST" }],
    }),
    updateIndividualDonor: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/donors/individual-donors/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "IndividualDonor", id }, { type: "IndividualDonor", id: "LIST" }],
    }),
    deleteIndividualDonor: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/donors/individual-donors/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "IndividualDonor", id }, { type: "IndividualDonor", id: "LIST" }],
    }),

    // Corporate Donors
    getAllCorporateDonors: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/donors/corporate-donors", params } : "/donors/corporate-donors"),
      providesTags: [{ type: "CorporateDonor", id: "LIST" }],
    }),
    getCorporateDonorById: builder.query<any, string | number>({
      query: (id) => `/donors/corporate-donors/${id}`,
      providesTags: (r, e, id) => [{ type: "CorporateDonor", id }],
    }),
    createCorporateDonor: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/donors/corporate-donors", method: "POST", body: data }),
      invalidatesTags: [{ type: "CorporateDonor", id: "LIST" }],
    }),
    updateCorporateDonor: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/donors/corporate-donors/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "CorporateDonor", id }, { type: "CorporateDonor", id: "LIST" }],
    }),
    deleteCorporateDonor: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/donors/corporate-donors/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "CorporateDonor", id }, { type: "CorporateDonor", id: "LIST" }],
    }),

    // Subscriptions
    getAllDonorSubscriptions: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/donors/donor-subscriptions", params } : "/donors/donor-subscriptions"),
      providesTags: [{ type: "DonorSubscription", id: "LIST" }],
    }),
    getDonorSubscriptionById: builder.query<any, string | number>({
      query: (id) => `/donors/donor-subscriptions/${id}`,
      providesTags: (r, e, id) => [{ type: "DonorSubscription", id }],
    }),
    createDonorSubscription: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/donors/donor-subscriptions", method: "POST", body: data }),
      invalidatesTags: [{ type: "DonorSubscription", id: "LIST" }],
    }),
    updateDonorSubscription: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/donors/donor-subscriptions/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "DonorSubscription", id }, { type: "DonorSubscription", id: "LIST" }],
    }),
    deleteDonorSubscription: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/donors/donor-subscriptions/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "DonorSubscription", id }, { type: "DonorSubscription", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllDonorsQuery,
  useGetDonorByIdQuery,
  useCreateDonorMutation,
  useUpdateDonorMutation,
  useDeleteDonorMutation,
  useGetAllIndividualDonorsQuery,
  useGetIndividualDonorByIdQuery,
  useCreateIndividualDonorMutation,
  useUpdateIndividualDonorMutation,
  useDeleteIndividualDonorMutation,
  useGetAllCorporateDonorsQuery,
  useGetCorporateDonorByIdQuery,
  useCreateCorporateDonorMutation,
  useUpdateCorporateDonorMutation,
  useDeleteCorporateDonorMutation,
  useGetAllDonorSubscriptionsQuery,
  useGetDonorSubscriptionByIdQuery,
  useCreateDonorSubscriptionMutation,
  useUpdateDonorSubscriptionMutation,
  useDeleteDonorSubscriptionMutation,
} = donorApi;
