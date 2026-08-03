import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface ExpenseAttachmentData {
  id: string | number;
  [key: string]: any;
}

export interface ExpenseAttachmentResponse {
  success: boolean;
  message: string;
  data: ExpenseAttachmentData | ExpenseAttachmentData[];
}

export const expenseAttachmentApi = createApi({
  reducerPath: "expenseAttachmentApi",
  baseQuery,
  tagTypes: ["ExpenseAttachment"],
  endpoints: (builder) => ({
    getAllExpenseAttachments: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/expense-attachments", params } : "/expense-attachments"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "ExpenseAttachment" as const, id })),
              { type: "ExpenseAttachment" as const, id: "LIST" },
            ]
          : [{ type: "ExpenseAttachment" as const, id: "LIST" }],
    }),
    getExpenseAttachmentById: builder.query<any, string | number>({
      query: (id) => "/expense-attachments/${id}",
      providesTags: (result, error, id) => [{ type: "ExpenseAttachment", id }],
    }),
    createExpenseAttachment: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/expense-attachments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ExpenseAttachment", id: "LIST" }],
    }),
    updateExpenseAttachment: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: "/expense-attachments/${id}",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ExpenseAttachment", id },
        { type: "ExpenseAttachment", id: "LIST" },
      ],
    }),
    deleteExpenseAttachment: builder.mutation<any, string | number>({
      query: (id) => ({
        url: "/expense-attachments/${id}",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "ExpenseAttachment", id },
        { type: "ExpenseAttachment", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllExpenseAttachmentsQuery,
  useGetExpenseAttachmentByIdQuery,
  useCreateExpenseAttachmentMutation,
  useUpdateExpenseAttachmentMutation,
  useDeleteExpenseAttachmentMutation,
} = expenseAttachmentApi;
