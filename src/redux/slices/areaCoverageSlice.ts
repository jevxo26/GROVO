import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface AreaCoverageData {
  id: string | number;
  [key: string]: any;
}

export interface AreaCoverageResponse {
  success: boolean;
  message: string;
  data: AreaCoverageData | AreaCoverageData[];
}

export const areaCoverageApi = createApi({
  reducerPath: "areaCoverageApi",
  baseQuery,
  tagTypes: ["AreaCoverage"],
  endpoints: (builder) => ({
    getAllAreaCoverages: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/area-coverages", params } : "/area-coverages"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "AreaCoverage" as const, id })),
              { type: "AreaCoverage" as const, id: "LIST" },
            ]
          : [{ type: "AreaCoverage" as const, id: "LIST" }],
    }),
    getAreaCoverageById: builder.query<any, string | number>({
      query: (id) => "/area-coverages/${id}",
      providesTags: (result, error, id) => [{ type: "AreaCoverage", id }],
    }),
    createAreaCoverage: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/area-coverages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "AreaCoverage", id: "LIST" }],
    }),
    updateAreaCoverage: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/area-coverages/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "AreaCoverage", id },
        { type: "AreaCoverage", id: "LIST" },
      ],
    }),
    deleteAreaCoverage: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/area-coverages/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "AreaCoverage", id },
        { type: "AreaCoverage", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllAreaCoveragesQuery,
  useGetAreaCoverageByIdQuery,
  useCreateAreaCoverageMutation,
  useUpdateAreaCoverageMutation,
  useDeleteAreaCoverageMutation,
} = areaCoverageApi;
