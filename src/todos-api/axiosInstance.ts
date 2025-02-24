// custom-instance.ts

import Axios, { type AxiosRequestConfig } from "axios";
import { getOidc } from "oidc";

const axiosInstance = Axios.create({ baseURL: import.meta.env.VITE_TODOS_API_URL });

axiosInstance.interceptors.request.use(async config => {
    const oidc = await getOidc();

    if (oidc.isUserLoggedIn) {
        const { accessToken } = await oidc.getTokens();

        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

// NOTE: Meant to be used by orval generated client
export const fetch = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> =>
    axiosInstance({ ...config, ...options }).then(({ data }) => data);
