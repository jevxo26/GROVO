import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface BranchStaffData {
  id: string | number;
  [key: string]: any;
}

export interface BranchStaffResponse {
  success: boolean;
  message: string;
  data: BranchStaffData | BranchStaffData[];
}

export const branchStaffApi = createApi({
  reducerPath: "branchStaffApi",
  baseQuery,
  tagTypes: ["BranchStaff"],
  endpoints: (builder) => ({
    getAllBranchStaffs: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/branch-staff", params } : "/branch-staff"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "BranchStaff" as const, id })),
              { type: "BranchStaff" as const, id: "LIST" },
            ]
          : [{ type: "BranchStaff" as const, id: "LIST" }],
    }),
    getBranchStaffById: builder.query<any, string | number>({
      query: (id) => "/branch-staff/${id}",
      providesTags: (result, error, id) => [{ type: "BranchStaff", id }],
    }),
    createBranchStaff: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/branch-staff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "BranchStaff", id: "LIST" }],
    }),
    updateBranchStaff: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/branch-staff/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "BranchStaff", id },
        { type: "BranchStaff", id: "LIST" },
      ],
    }),
    deleteBranchStaff: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/branch-staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "BranchStaff", id },
        { type: "BranchStaff", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllBranchStaffsQuery,
  useGetBranchStaffByIdQuery,
  useCreateBranchStaffMutation,
  useUpdateBranchStaffMutation,
  useDeleteBranchStaffMutation,
} = branchStaffApi;
