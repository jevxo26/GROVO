import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface ProjectBudgetData {
  id: string | number;
  [key: string]: any;
}

export interface ProjectBudgetResponse {
  success: boolean;
  message: string;
  data: ProjectBudgetData | ProjectBudgetData[];
}

export const projectBudgetApi = createApi({
  reducerPath: "projectBudgetApi",
  baseQuery,
  tagTypes: ["ProjectBudget"],
  endpoints: (builder) => ({
    getAllProjectBudgets: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/project-budgets", params } : "/project-budgets"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "ProjectBudget" as const, id })),
              { type: "ProjectBudget" as const, id: "LIST" },
            ]
          : [{ type: "ProjectBudget" as const, id: "LIST" }],
    }),
    getProjectBudgetById: builder.query<any, string | number>({
      query: (id) => "/project-budgets/${id}",
      providesTags: (result, error, id) => [{ type: "ProjectBudget", id }],
    }),
    createProjectBudget: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/project-budgets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ProjectBudget", id: "LIST" }],
    }),
    updateProjectBudget: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/project-budgets/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ProjectBudget", id },
        { type: "ProjectBudget", id: "LIST" },
      ],
    }),
    deleteProjectBudget: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/project-budgets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ProjectBudget", id },
        { type: "ProjectBudget", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllProjectBudgetsQuery,
  useGetProjectBudgetByIdQuery,
  useCreateProjectBudgetMutation,
  useUpdateProjectBudgetMutation,
  useDeleteProjectBudgetMutation,
} = projectBudgetApi;
