import { api } from "./index";

export const loginApi = api.injectEndpoints({
    endpoints: (build) => ({
        signIn: build.mutation({
            query: (body) => ({
                url: "/auths/sign-in",
                method: "POST",
                body,
                responseHandler: (response) => response.text(),
            }),
            transformResponse: (response) => {
                return { token: response };
            },
            invalidatesTags: ["Company"],
        }),

        signUp: build.mutation({
            query: (body) => ({
                url: "/auths/sign-up",
                method: "POST",
                body,
                responseHandler: (response) => response.text(),
            }),
            transformResponse: (response) => {
                return { response };
            },
            invalidatesTags: ["Company"],
        }),
        getInfo: build.query({
            query: () => ({
                url: "/auths/get-info",
            }),
        }),
    })
})

export const { useGetInfoQuery, useSignInMutation, useSignUpMutation } = loginApi