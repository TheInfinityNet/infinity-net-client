import axios, { AxiosInstance } from "axios";
import { createContext, ReactNode, useContext, useMemo } from "react";

interface AxiosContextValue {
  axios: AxiosInstance;
}

const AxiosContext = createContext<AxiosContextValue | undefined>(undefined);

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

export const useAxios = () => {
  const context = useContext(AxiosContext);
  if (!context)
    throw new Error("useAxios must be used within an AxiosProvider");
  return context;
};
