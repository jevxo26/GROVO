import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery,
  tagTypes: [
    "Role", "Permission", "RolePermission", "UserRole", "StaffRole",
    "VolunteerRole", "CoordinatorRole", "CommitteeRole", "AdminPermission",
    "RoleHierarchy", "AccessLog"
  ],
  endpoints: (builder) => ({
    // Roles
    getAllRoles: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/role/roles", params } : "/role/roles"),
      providesTags: [{ type: "Role", id: "LIST" }],
    }),
    getRoleById: builder.query<any, string | number>({
      query: (id) => `/role/roles/${id}`,
      providesTags: (r, e, id) => [{ type: "Role", id }],
    }),
    createRole: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/role/roles", method: "POST", body: data }),
      invalidatesTags: [{ type: "Role", id: "LIST" }],
    }),
    updateRole: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/role/roles/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "Role", id }, { type: "Role", id: "LIST" }],
    }),
    deleteRole: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/role/roles/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Role", id }, { type: "Role", id: "LIST" }],
    }),

    // Permissions
    getAllPermissions: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/role/permissions", params } : "/role/permissions"),
      providesTags: [{ type: "Permission", id: "LIST" }],
    }),
    getPermissionById: builder.query<any, string | number>({
      query: (id) => `/role/permissions/${id}`,
      providesTags: (r, e, id) => [{ type: "Permission", id }],
    }),
    createPermission: builder.mutation<any, Partial<any>>({
      query: (data) => ({ url: "/role/permissions", method: "POST", body: data }),
      invalidatesTags: [{ type: "Permission", id: "LIST" }],
    }),
    updatePermission: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({ url: `/role/permissions/${id}`, method: "PATCH", body: data }),
      invalidatesTags: (r, e, { id }) => [{ type: "Permission", id }, { type: "Permission", id: "LIST" }],
    }),
    deletePermission: builder.mutation<any, string | number>({
      query: (id) => ({ url: `/role/permissions/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Permission", id }, { type: "Permission", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetAllPermissionsQuery,
  useGetPermissionByIdQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = roleApi;
