import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface ProjectExpenseData {
  id: string | number;
  [key: string]: any;
}

export interface ProjectExpenseResponse {
  success: boolean;
  message: string;
  data: ProjectExpenseData | ProjectExpenseData[];
}

export const projectExpenseApi = createApi({
  reducerPath: "projectExpenseApi",
  baseQuery,
  tagTypes: ["ProjectExpense"],
  endpoints: (builder) => ({
    getAllProjectExpenses: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/project-expenses", params } : "/project-expenses"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "ProjectExpense" as const, id })),
              { type: "ProjectExpense" as const, id: "LIST" },
            ]
          : [{ type: "ProjectExpense" as const, id: "LIST" }],
    }),
    getProjectExpenseById: builder.query<any, string | number>({
      query: (id) => "/project-expenses/${id}",
      providesTags: (result, error, id) => [{ type: "ProjectExpense", id }],
    }),
    createProjectExpense: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/project-expenses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ProjectExpense", id: "LIST" }],
    }),
    updateProjectExpense: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/project-expenses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ProjectExpense", id },
        { type: "ProjectExpense", id: "LIST" },
      ],
    }),
    deleteProjectExpense: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/project-expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ProjectExpense", id },
        { type: "ProjectExpense", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllProjectExpensesQuery,
  useGetProjectExpenseByIdQuery,
  useCreateProjectExpenseMutation,
  useUpdateProjectExpenseMutation,
  useDeleteProjectExpenseMutation,
} = projectExpenseApi;
