import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface DivisionData {
  id: string | number;
  [key: string]: any;
}

export interface DivisionResponse {
  success: boolean;
  message: string;
  data: DivisionData | DivisionData[];
}

export const divisionApi = createApi({
  reducerPath: "divisionApi",
  baseQuery,
  tagTypes: ["Division"],
  endpoints: (builder) => ({
    getAllDivisions: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/divisions", params } : "/divisions"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Division" as const, id })),
              { type: "Division" as const, id: "LIST" },
            ]
          : [{ type: "Division" as const, id: "LIST" }],
    }),
    getDivisionById: builder.query<any, string | number>({
      query: (id) => "/divisions/${id}",
      providesTags: (result, error, id) => [{ type: "Division", id }],
    }),
    createDivision: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/divisions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Division", id: "LIST" }],
    }),
    updateDivision: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/divisions/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Division", id },
        { type: "Division", id: "LIST" },
      ],
    }),
    deleteDivision: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/divisions/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Division", id },
        { type: "Division", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllDivisionsQuery,
  useGetDivisionByIdQuery,
  useCreateDivisionMutation,
  useUpdateDivisionMutation,
  useDeleteDivisionMutation,
} = divisionApi;
