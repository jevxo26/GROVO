import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const analyticsReportsApi = createApi({
  reducerPath: "analyticsReportsApi",
  baseQuery,
  tagTypes: [
    "Dashboard", "DashboardWidget", "DashboardLayout", "KPI",
    "AnalyticsSnapshot", "DonationAnalytics", "CampaignAnalytics", "ProjectAnalytics",
    "VolunteerAnalytics", "BeneficiaryAnalytics", "BranchAnalytics", "FinancialAnalytics",
    "MembershipAnalytics", "UserActivityAnalytics", "Report", "ReportTemplate",
    "ScheduledReport", "ReportExport", "AuditLog", "SystemLog", "ErrorLog",
    "VisitorAnalytics", "PerformanceMetric"
  ],
  endpoints: (builder) => ({
    // Dashboards
    getAllDashboards: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/analytics-reports/dashboards", params } : "/analytics-reports/dashboards"),
      providesTags: [{ type: "Dashboard", id: "LIST" }],
    }),
    getDashboardById: builder.query<any, string | number>({
      query: (id) => `/analytics-reports/dashboards/${id}`,
      providesTags: (r, e, id) => [{ type: "Dashboard", id }],
    }),
    createDashboard: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/analytics-reports/dashboards", method: "POST", body: data }),
      invalidatesTags: [{ type: "Dashboard", id: "LIST" }],
    }),
    updateDashboard: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/analytics-reports/dashboards/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "Dashboard", id }, { type: "Dashboard", id: "LIST" }],
    }),
    deleteDashboard: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/analytics-reports/dashboards/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Dashboard", id }, { type: "Dashboard", id: "LIST" }],
    }),

    // Reports
    getAllReports: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/analytics-reports/reports", params } : "/analytics-reports/reports"),
      providesTags: [{ type: "Report", id: "LIST" }],
    }),
    getReportById: builder.query<any, string | number>({
      query: (id) => `/analytics-reports/reports/${id}`,
      providesTags: (r, e, id) => [{ type: "Report", id }],
    }),
    createReport: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/analytics-reports/reports", method: "POST", body: data }),
      invalidatesTags: [{ type: "Report", id: "LIST" }],
    }),
    updateReport: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/analytics-reports/reports/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "Report", id }, { type: "Report", id: "LIST" }],
    }),
    deleteReport: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/analytics-reports/reports/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Report", id }, { type: "Report", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllDashboardsQuery,
  useGetDashboardByIdQuery,
  useCreateDashboardMutation,
  useUpdateDashboardMutation,
  useDeleteDashboardMutation,
  useGetAllReportsQuery,
  useGetReportByIdQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation,
} = analyticsReportsApi;
