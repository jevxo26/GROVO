import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface ProjectBeneficiaryData {
  id: string | number;
  [key: string]: any;
}

export interface ProjectBeneficiaryResponse {
  success: boolean;
  message: string;
  data: ProjectBeneficiaryData | ProjectBeneficiaryData[];
}

export const projectBeneficiaryApi = createApi({
  reducerPath: "projectBeneficiaryApi",
  baseQuery,
  tagTypes: ["ProjectBeneficiary"],
  endpoints: (builder) => ({
    getAllProjectBeneficiarys: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/project-beneficiaries", params } : "/project-beneficiaries"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "ProjectBeneficiary" as const, id })),
              { type: "ProjectBeneficiary" as const, id: "LIST" },
            ]
          : [{ type: "ProjectBeneficiary" as const, id: "LIST" }],
    }),
    getProjectBeneficiaryById: builder.query<any, string | number>({
      query: (id) => "/project-beneficiaries/${id}",
      providesTags: (result, error, id) => [{ type: "ProjectBeneficiary", id }],
    }),
    createProjectBeneficiary: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/project-beneficiaries",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ProjectBeneficiary", id: "LIST" }],
    }),
    updateProjectBeneficiary: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/project-beneficiaries/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ProjectBeneficiary", id },
        { type: "ProjectBeneficiary", id: "LIST" },
      ],
    }),
    deleteProjectBeneficiary: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/project-beneficiaries/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ProjectBeneficiary", id },
        { type: "ProjectBeneficiary", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllProjectBeneficiarysQuery,
  useGetProjectBeneficiaryByIdQuery,
  useCreateProjectBeneficiaryMutation,
  useUpdateProjectBeneficiaryMutation,
  useDeleteProjectBeneficiaryMutation,
} = projectBeneficiaryApi;
