import axios, { AxiosInstance } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useToken } from "./token.context";

interface AxiosContextValue {
  axios: AxiosInstance;
}

const AxiosContext = createContext<AxiosContextValue | null>(null);

export const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API,
      timeout: 50000,
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
  }, []);

  return (
    <AxiosContext.Provider value={{ axios: axiosInstance }}>
      {children}
    </AxiosContext.Provider>
  );
};

export function AxiosInterceptor({ children }: { children: React.ReactNode }) {
  const { axios } = useAxios();
  const { getAccessToken } = useToken();
  const [isInterceptorReady, setInterceptorReady] = useState<boolean>(false);

  useEffect(() => {
    const interceptorId = axios.interceptors.request.use(
      async (config) => {
        let accessToken = null;
        try {
          accessToken = await getAccessToken();
        } catch (error) {
          console.error(error);
        }
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      null,
      {
        runWhen(config) {
          return !config.headers["No-Auth"];
        },
      },
    );

    setInterceptorReady(true);

    return () => {
      axios.interceptors.request.eject(interceptorId);
    };
  }, [axios]);

  if (!isInterceptorReady) {
    return <div>Loading...</div>;
  }

  return children;
}

export const useAxios = () => {
  const context = useContext(AxiosContext);
  if (!context)
    throw new Error("useAxios must be used within an AxiosProvider");
  return context;
};
