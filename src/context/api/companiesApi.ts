import { api } from "./index";

export const companiesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllCompanies: build.query({
            query: () => ({
                url: `/companies/get-all`,
            }),
            providesTags: ["Company"]
        }),
        deleteCompany: build.mutation({
            query: (body) => ({
                url: `/companies/delete/by-id`,
                method: 'DELETE',
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ["Company"],
        }),
        updateCompany: build.mutation({
            query: (body) => ({
                url: `/companies/update`,
                body,
                method: 'PUT'
            }),
            invalidatesTags: ["Company"],
        }),
        createCompany: build.mutation({
            query: (body) => ({
                url: `/companies/add`,
                body,
                method: 'POST'
            }),
            invalidatesTags: ["Company"],
        }),
    })
})

export const { useGetAllCompaniesQuery, useCreateCompanyMutation, useUpdateCompanyMutation, useDeleteCompanyMutation } = companiesApi