import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface ProjectVolunteerData {
  id: string | number;
  [key: string]: any;
}

export interface ProjectVolunteerResponse {
  success: boolean;
  message: string;
  data: ProjectVolunteerData | ProjectVolunteerData[];
}

export const projectVolunteerApi = createApi({
  reducerPath: "projectVolunteerApi",
  baseQuery,
  tagTypes: ["ProjectVolunteer"],
  endpoints: (builder) => ({
    getAllProjectVolunteers: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/project-volunteers", params } : "/project-volunteers"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "ProjectVolunteer" as const, id })),
              { type: "ProjectVolunteer" as const, id: "LIST" },
            ]
          : [{ type: "ProjectVolunteer" as const, id: "LIST" }],
    }),
    getProjectVolunteerById: builder.query<any, string | number>({
      query: (id) => "/project-volunteers/${id}",
      providesTags: (result, error, id) => [{ type: "ProjectVolunteer", id }],
    }),
    createProjectVolunteer: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/project-volunteers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ProjectVolunteer", id: "LIST" }],
    }),
    updateProjectVolunteer: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/project-volunteers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ProjectVolunteer", id },
        { type: "ProjectVolunteer", id: "LIST" },
      ],
    }),
    deleteProjectVolunteer: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/project-volunteers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ProjectVolunteer", id },
        { type: "ProjectVolunteer", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllProjectVolunteersQuery,
  useGetProjectVolunteerByIdQuery,
  useCreateProjectVolunteerMutation,
  useUpdateProjectVolunteerMutation,
  useDeleteProjectVolunteerMutation,
} = projectVolunteerApi;
