import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface ProjectTimelineData {
  id: string | number;
  [key: string]: any;
}

export interface ProjectTimelineResponse {
  success: boolean;
  message: string;
  data: ProjectTimelineData | ProjectTimelineData[];
}

export const projectTimelineApi = createApi({
  reducerPath: "projectTimelineApi",
  baseQuery,
  tagTypes: ["ProjectTimeline"],
  endpoints: (builder) => ({
    getAllProjectTimelines: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/project-timelines", params } : "/project-timelines"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "ProjectTimeline" as const, id })),
              { type: "ProjectTimeline" as const, id: "LIST" },
            ]
          : [{ type: "ProjectTimeline" as const, id: "LIST" }],
    }),
    getProjectTimelineById: builder.query<any, string | number>({
      query: (id) => "/project-timelines/${id}",
      providesTags: (result, error, id) => [{ type: "ProjectTimeline", id }],
    }),
    createProjectTimeline: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/project-timelines",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ProjectTimeline", id: "LIST" }],
    }),
    updateProjectTimeline: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/project-timelines/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ProjectTimeline", id },
        { type: "ProjectTimeline", id: "LIST" },
      ],
    }),
    deleteProjectTimeline: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/project-timelines/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ProjectTimeline", id },
        { type: "ProjectTimeline", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllProjectTimelinesQuery,
  useGetProjectTimelineByIdQuery,
  useCreateProjectTimelineMutation,
  useUpdateProjectTimelineMutation,
  useDeleteProjectTimelineMutation,
} = projectTimelineApi;
