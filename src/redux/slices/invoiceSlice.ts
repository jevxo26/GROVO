import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export interface InvoiceData {
  id: string | number;
  [key: string]: any;
}

export interface InvoiceResponse {
  success: boolean;
  message: string;
  data: InvoiceData | InvoiceData[];
}

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery,
  tagTypes: ["Invoice"],
  endpoints: (builder) => ({
    getAllInvoices: builder.query<any, Record<string, any> | void>({
      query: (params) => (params ? { url: "/invoices", params } : "/invoices"),
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map(({ id }: { id: string | number }) => ({ type: "Invoice" as const, id })),
              { type: "Invoice" as const, id: "LIST" },
            ]
          : [{ type: "Invoice" as const, id: "LIST" }],
    }),
    getInvoiceById: builder.query<any, string | number>({
      query: (id) => "/invoices/${id}",
      providesTags: (result, error, id) => [{ type: "Invoice", id }],
    }),
    createInvoice: builder.mutation<any, Partial<any>>({
      query: (data) => ({
        url: "/invoices",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Invoice", id: "LIST" }],
    }),
    updateInvoice: builder.mutation<any, { id: string | number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/invoices/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Invoice", id },
        { type: "Invoice", id: "LIST" },
      ],
    }),
    deleteInvoice: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Invoice", id },
        { type: "Invoice", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
