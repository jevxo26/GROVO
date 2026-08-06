import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface ProjectReportData {
  id: string | number;
  [key: string]: any;
}

export interface ProjectReportResponse {
  success: boolean;
  message: string;
  data: ProjectReportData | ProjectReportData[];
}

export const projectReportApi = createApi({
  reducerPath: "projectReportApi",
  baseQuery,
  tagTypes: ["ProjectReport"],
  endpoints: (builder) => ({
    getAllProjectReports: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/project-reports", params } : "/project-reports"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "ProjectReport" as const, id })),
              { type: "ProjectReport" as const, id: "LIST" },
            ]
          : [{ type: "ProjectReport" as const, id: "LIST" }],
    }),
    getProjectReportById: builder.query<any, string | number>({
      query: (id) => "/project-reports/${id}",
      providesTags: (result, error, id) => [{ type: "ProjectReport", id }],
    }),
    createProjectReport: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/project-reports",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ProjectReport", id: "LIST" }],
    }),
    updateProjectReport: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/project-reports/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ProjectReport", id },
        { type: "ProjectReport", id: "LIST" },
      ],
    }),
    deleteProjectReport: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/project-reports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ProjectReport", id },
        { type: "ProjectReport", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllProjectReportsQuery,
  useGetProjectReportByIdQuery,
  useCreateProjectReportMutation,
  useUpdateProjectReportMutation,
  useDeleteProjectReportMutation,
} = projectReportApi;
