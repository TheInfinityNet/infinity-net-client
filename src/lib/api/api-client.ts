import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  HttpStatusCode,
} from "axios";
import { useAuthStore } from "@/stores/auth.store";

export type Response<TStatusCode extends HttpStatusCode, TData = unknown> = {
  statusCode: TStatusCode;
  data: TData;
};

export type UnprocessableEntityResponse<T = unknown> = Response<
  HttpStatusCode.UnprocessableEntity,
  {
    errors: {
      [key in keyof T]?: string[];
    };
  }
>;

export type BadRequestResponse = Response<
  HttpStatusCode.BadRequest,
  {
    message: string;
  }
>;

export type UnauthorizedResponse = Response<
  HttpStatusCode.Unauthorized,
  {
    message: string;
  }
>;

export type ForbiddenResponse = Response<
  HttpStatusCode.Forbidden,
  {
    message: string;
  }
>;

export type LockedResponse = Response<
  HttpStatusCode.Locked,
  {
    message: string;
  }
>;

export type PreconditionFailedResponse = Response<
  HttpStatusCode.PreconditionFailed,
  {
    message: string;
  }
>;

export type PreconditionRequiredResponse = Response<
  HttpStatusCode.PreconditionRequired,
  {
    message: string;
  }
>;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers["No-Auth"] === undefined) {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

class APIClient {
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "PUT" });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  }
}

const apiClient = new APIClient();

export default apiClient;
