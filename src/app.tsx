import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";

import { GenericLayout } from "./routes/layouts/generic.layout";
import { ProfilePage } from "./routes/pages/profile.page";
import { LandingPage } from "./routes/pages/landing.page";
import { AuthenticatedLayout } from "./routes/layouts/authenticated.layout";
import { FeedLayout } from "./routes/layouts/feed.layout";
import { HomePage } from "./routes/pages/home.page";
import { NotificationPage } from "./routes/pages/notifications.page";
import { MessagesPage } from "./routes/pages/messages.page";
import { AuthLayout } from "./routes/layouts/auth.layout";
import { SignInPage } from "./routes/pages/sign-in.page";
import { SignUpPage } from "./routes/pages/sign-up.page";
import { ResetPasswordPage } from "./routes/pages/reset-password.page";
import { ForgotPasswordPage } from "./routes/pages/forgot-password.page";
import { EmailVerificationPage } from "./routes/pages/email-verification.page";
import { EmailVerificationTokenPage } from "./routes/pages/email-verification-token.page";
import { WelcomePage } from "./routes/pages/welcome.page";
import { PostPage } from "./routes/pages/post.page";
import { AxiosInterceptor, AxiosProvider } from "./contexts/axios.context";
import { TokenProvider } from "./contexts/token.context";
import { ApiClientProvider } from "./contexts/api-client.context";
import { AuthProvider } from "./contexts/auth.context";
import { useGetCurrentUser } from "./hooks/useGetCurrentUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GenericLayout />,
    children: [
      {
        path: "users/:id",
        element: <ProfilePage />,
      },
      {
        path: "landing",
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "",
        element: <FeedLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "explore",
            element: <div>Explore</div>,
          },
          {
            path: "posts/:id",
            element: <PostPage />,
          },
        ],
      },
      {
        path: "notifications",
        element: <NotificationPage />,
      },
    ],
  },
  {
    path: "messages",
    element: <MessagesPage />,
  },
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "email-verification",
        element: <EmailVerificationPage />,
      },
      {
        path: "email-verification-token",
        element: <EmailVerificationTokenPage />,
      },
      {
        path: "welcome",
        element: <WelcomePage />,
      },
    ],
  },
]);

export const queryClient = new QueryClient();

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

  if (isLoading) {
    return null;
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
