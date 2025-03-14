import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from "./types";


// Ensure the base URL is correctly set
const baseUrl = "http://localhost:9000/";
if (!baseUrl) {
  console.error("VITE_BASE_URL is not defined in the .env file.");
}

export const api = createApi({
  reducerPath: "main",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query<GetKpisResponse[], void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<GetProductsResponse[], void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<GetTransactionsResponse[], void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} = api;
