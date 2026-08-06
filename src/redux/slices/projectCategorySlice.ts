import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface ProjectCategoryData {
  id: string | number;
  [key: string]: any;
}

export interface ProjectCategoryResponse {
  success: boolean;
  message: string;
  data: ProjectCategoryData | ProjectCategoryData[];
}

export const projectCategoryApi = createApi({
  reducerPath: "projectCategoryApi",
  baseQuery,
  tagTypes: ["ProjectCategory"],
  endpoints: (builder) => ({
    getAllProjectCategorys: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/project-categories", params } : "/project-categories"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "ProjectCategory" as const, id })),
              { type: "ProjectCategory" as const, id: "LIST" },
            ]
          : [{ type: "ProjectCategory" as const, id: "LIST" }],
    }),
    getProjectCategoryById: builder.query<any, string | number>({
      query: (id) => "/project-categories/${id}",
      providesTags: (result, error, id) => [{ type: "ProjectCategory", id }],
    }),
    createProjectCategory: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/project-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ProjectCategory", id: "LIST" }],
    }),
    updateProjectCategory: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/project-categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ProjectCategory", id },
        { type: "ProjectCategory", id: "LIST" },
      ],
    }),
    deleteProjectCategory: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/project-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ProjectCategory", id },
        { type: "ProjectCategory", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllProjectCategorysQuery,
  useGetProjectCategoryByIdQuery,
  useCreateProjectCategoryMutation,
  useUpdateProjectCategoryMutation,
  useDeleteProjectCategoryMutation,
} = projectCategoryApi;
