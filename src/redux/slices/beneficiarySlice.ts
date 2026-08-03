import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const beneficiaryApi = createApi({
  reducerPath: "beneficiaryApi",
  baseQuery,
  tagTypes: [
    "Beneficiary", "BeneficiaryProfile", "FamilyMember", "BeneficiaryCategory",
    "BeneficiaryDocument", "BeneficiaryVerification", "BeneficiaryNeedAssessment",
    "ReliefPackage", "ReliefItem", "DistributionCampaign", "DistributionSchedule",
    "DistributionCenter", "BeneficiaryQRCode", "DistributionRecord", "DistributionItem",
    "DistributionVerification", "Acknowledgement", "BeneficiaryFeedback", "FollowUpVisit",
    "CaseHistory", "BeneficiaryActivityLog"
  ],
  endpoints: (builder) => ({
    // Beneficiaries Core
    getAllBeneficiaries: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/beneficiaries/beneficiaries", params } : "/beneficiaries/beneficiaries"),
      providesTags: [{ type: "Beneficiary", id: "LIST" }],
    }),
    getBeneficiaryById: builder.query<any, string | number>({
      query: (id) => `/beneficiaries/beneficiaries/${id}`,
      providesTags: (r, e, id) => [{ type: "Beneficiary", id }],
    }),
    createBeneficiary: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/beneficiaries/beneficiaries", method: "POST", body: data }),
      invalidatesTags: [{ type: "Beneficiary", id: "LIST" }],
    }),
    updateBeneficiary: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/beneficiaries/beneficiaries/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "Beneficiary", id }, { type: "Beneficiary", id: "LIST" }],
    }),
    deleteBeneficiary: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/beneficiaries/beneficiaries/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Beneficiary", id }, { type: "Beneficiary", id: "LIST" }],
    }),

    // Relief Packages
    getAllReliefPackages: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/beneficiaries/relief-packages", params } : "/beneficiaries/relief-packages"),
      providesTags: [{ type: "ReliefPackage", id: "LIST" }],
    }),
    getReliefPackageById: builder.query<any, string | number>({
      query: (id) => `/beneficiaries/relief-packages/${id}`,
      providesTags: (r, e, id) => [{ type: "ReliefPackage", id }],
    }),
    createReliefPackage: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/beneficiaries/relief-packages", method: "POST", body: data }),
      invalidatesTags: [{ type: "ReliefPackage", id: "LIST" }],
    }),
    updateReliefPackage: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/beneficiaries/relief-packages/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "ReliefPackage", id }, { type: "ReliefPackage", id: "LIST" }],
    }),
    deleteReliefPackage: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/beneficiaries/relief-packages/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "ReliefPackage", id }, { type: "ReliefPackage", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllBeneficiariesQuery,
  useGetBeneficiaryByIdQuery,
  useCreateBeneficiaryMutation,
  useUpdateBeneficiaryMutation,
  useDeleteBeneficiaryMutation,
  useGetAllReliefPackagesQuery,
  useGetReliefPackageByIdQuery,
  useCreateReliefPackageMutation,
  useUpdateReliefPackageMutation,
  useDeleteReliefPackageMutation,
} = beneficiaryApi;
