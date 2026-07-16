import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: async (headers) => {
      try {
        const { supabase } = await import("src/services/reducers/supabaseClient");
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.access_token) {
          headers.set("Authorization", `Bearer ${session.access_token}`);
        }
      } catch (err) {
        console.error("Error setting auth headers:", err);
      }
      return headers;
    },
  }),
  tagTypes: ["Products", "Lookups"],

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    getSimpleProducts: builder.query({
      query: () => "/products/simple",
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    searchProducts: builder.query({
      query: (params) => {
        const query = new URLSearchParams();
        if (params.category) query.append("category", params.category);
        if (params.materials) query.append("materials", params.materials);
        if (params.sizes) query.append("sizes", params.sizes);
        if (params.colors) query.append("colors", params.colors);
        if (params.maxPrice) query.append("maxPrice", params.maxPrice);
        if (params.sort) query.append("sort", params.sort);
        if (params.search) query.append("search", params.search);
        query.append("page", params.page || 1);
        query.append("limit", params.limit || 15);

        return `/products/search?${query.toString()}`;
      },
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => ["Products", { type: "Products", id }],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    getFeaturedProducts: builder.query({
      query: () => "/products/featured",
    }),

    getFacets: builder.query({
      query: () => "/products/facets",
      providesTags: ["Products"],
    }),

    getCategories: builder.query({
      query: () => "/categories",
    }),

    // Lookups endpoints
    getLookups: builder.query({
      query: () => "/lookups",
      providesTags: ["Lookups"],
    }),

    createLookup: builder.mutation({
      query: (body) => ({
        url: "/lookups",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Lookups"],
    }),

    updateLookup: builder.mutation({
      query: (body) => ({
        url: "/lookups",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Lookups"],
    }),

    deleteLookup: builder.mutation({
      query: ({ type, id }) => ({
        url: `/lookups?type=${type}&id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lookups"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetSimpleProductsQuery,
  useLazyGetSimpleProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
  useGetFeaturedProductsQuery,
  useLazyGetFeaturedProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetFacetsQuery,
  useLazyGetFacetsQuery,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetLookupsQuery,
  useLazyGetLookupsQuery,
  useCreateLookupMutation,
  useUpdateLookupMutation,
  useDeleteLookupMutation,
} = productsApi;
