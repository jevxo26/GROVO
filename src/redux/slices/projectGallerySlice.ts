import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface ProjectGalleryData {
  id: string | number;
  [key: string]: any;
}

export interface ProjectGalleryResponse {
  success: boolean;
  message: string;
  data: ProjectGalleryData | ProjectGalleryData[];
}

export const projectGalleryApi = createApi({
  reducerPath: "projectGalleryApi",
  baseQuery,
  tagTypes: ["ProjectGallery"],
  endpoints: (builder) => ({
    getAllProjectGallerys: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/project-gallery", params } : "/project-gallery"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "ProjectGallery" as const, id })),
              { type: "ProjectGallery" as const, id: "LIST" },
            ]
          : [{ type: "ProjectGallery" as const, id: "LIST" }],
    }),
    getProjectGalleryById: builder.query<any, string | number>({
      query: (id) => "/project-gallery/${id}",
      providesTags: (result, error, id) => [{ type: "ProjectGallery", id }],
    }),
    createProjectGallery: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/project-gallery",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ProjectGallery", id: "LIST" }],
    }),
    updateProjectGallery: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/project-gallery/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ProjectGallery", id },
        { type: "ProjectGallery", id: "LIST" },
      ],
    }),
    deleteProjectGallery: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/project-gallery/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ProjectGallery", id },
        { type: "ProjectGallery", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllProjectGallerysQuery,
  useGetProjectGalleryByIdQuery,
  useCreateProjectGalleryMutation,
  useUpdateProjectGalleryMutation,
  useDeleteProjectGalleryMutation,
} = projectGalleryApi;
