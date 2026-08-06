import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface ProjectUpdateData {
  id: string | number;
  [key: string]: any;
}

export interface ProjectUpdateResponse {
  success: boolean;
  message: string;
  data: ProjectUpdateData | ProjectUpdateData[];
}

export const projectUpdateApi = createApi({
  reducerPath: "projectUpdateApi",
  baseQuery,
  tagTypes: ["ProjectUpdate"],
  endpoints: (builder) => ({
    getAllProjectUpdates: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/project-updates", params } : "/project-updates"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "ProjectUpdate" as const, id })),
              { type: "ProjectUpdate" as const, id: "LIST" },
            ]
          : [{ type: "ProjectUpdate" as const, id: "LIST" }],
    }),
    getProjectUpdateById: builder.query<any, string | number>({
      query: (id) => "/project-updates/${id}",
      providesTags: (result, error, id) => [{ type: "ProjectUpdate", id }],
    }),
    createProjectUpdate: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/project-updates",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ProjectUpdate", id: "LIST" }],
    }),
    updateProjectUpdate: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/project-updates/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ProjectUpdate", id },
        { type: "ProjectUpdate", id: "LIST" },
      ],
    }),
    deleteProjectUpdate: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/project-updates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ProjectUpdate", id },
        { type: "ProjectUpdate", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllProjectUpdatesQuery,
  useGetProjectUpdateByIdQuery,
  useCreateProjectUpdateMutation,
  useUpdateProjectUpdateMutation,
  useDeleteProjectUpdateMutation,
} = projectUpdateApi;
