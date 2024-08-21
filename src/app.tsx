import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

// import { GenericLayout } from "./routes/layouts/generic.layout";
// import { ProfilePage } from "./routes/pages/profile.page";
// import { LandingPage } from "./routes/pages/landing.page";
// import { AuthenticatedLayout } from "./routes/layouts/authenticated.layout";
// import { FeedLayout } from "./routes/layouts/feed.layout";
// import { HomePage } from "./routes/pages/home.page";
// import { NotificationPage } from "./routes/pages/notifications.page";
// import { MessagesPage } from "./routes/pages/messages.page";
import { AuthLayout } from "./routes/layouts/auth.layout";
import { SignInPage } from "./routes/pages/sign-in.page";
// import { SignUpPage } from "./routes/pages/sign-up.page";
// import { ResetPasswordPage } from "./routes/pages/reset-password.page";
// import { ForgotPasswordPage } from "./routes/pages/forgot-password.page";
// import { EmailVerificationPage } from "./routes/pages/email-verification.page";
// import { EmailVerificationTokenPage } from "./routes/pages/email-verification-token.page";
// import { WelcomePage } from "./routes/pages/welcome.page";
// import { PostPage } from "./routes/pages/post.page";
import { AxiosProvider, useAxios } from "./contexts/axios.context";
import { TokenProvider, useToken } from "./contexts/token.context";
import { ApiClientProvider, useApiClient } from "./contexts/api-client.context";
import { AuthProvider, useAuth } from "./contexts/auth.context";
import { useCallback, useEffect, useState } from "react";
import { getAccessTokenState, getRefreshTokenState } from "./lib/utils";
import { AccessTokenState, RefreshTokenState } from "./types/token.type";
import { useGetCurrentUser } from "./hooks/useGetCurrentUser";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <GenericLayout />,
  //   children: [
  //     {
  //       path: "users/:id",
  //       element: <ProfilePage />,
  //     },
  //     {
  //       path: "landing",
  //       element: <LandingPage />,
  //     },
  //   ],
  // },
  // {
  //   path: "/",
  //   element: <AuthenticatedLayout />,
  //   children: [
  //     {
  //       path: "",
  //       element: <FeedLayout />,
  //       children: [
  //         {
  //           index: true,
  //           element: <HomePage />,
  //         },
  //         {
  //           path: "explore",
  //           element: <div>Explore</div>,
  //         },
  //         {
  //           path: "posts/:id",
  //           element: <PostPage />,
  //         },
  //       ],
  //     },
  //     {
  //       path: "notifications",
  //       element: <NotificationPage />,
  //     },
  //   ],
  // },
  // {
  //   path: "messages",
  //   element: <MessagesPage />,
  // },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      // {
      //   path: "sign-up",
      //   element: <SignUpPage />,
      // },
      // {
      //   path: "reset-password",
      //   element: <ResetPasswordPage />,
      // },
      // {
      //   path: "forgot-password",
      //   element: <ForgotPasswordPage />,
      // },
      // {
      //   path: "email-verification",
      //   element: <EmailVerificationPage />,
      // },
      // {
      //   path: "email-verification-token",
      //   element: <EmailVerificationTokenPage />,
      // },
      // {
      //   path: "welcome",
      //   element: <WelcomePage />,
      // },
    ],
  },
]);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AxiosProvider>
        <ApiClientProvider>
          <TokenProvider>
            <AuthProvider>
              <ThemeProvider defaultTheme="light" storageKey="ui-theme">
                {children}
              </ThemeProvider>
            </AuthProvider>
          </TokenProvider>
        </ApiClientProvider>
      </AxiosProvider>
    </QueryClientProvider>
  );
}

export function AppInitializer({ children }: { children: React.ReactNode }) {
  const { isLoading } = useGetCurrentUser();
  if (isLoading) return <div>Loading...</div>;

  return children;
}

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

export function App() {
  return (
    <Providers>
      <AxiosInterceptor>
        <AppInitializer>
          <RouterProvider router={router} />
          <Toaster />
        </AppInitializer>
      </AxiosInterceptor>
    </Providers>
  );
}
