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
        ],
      },
      {
        path: "notifications",
        element: <NotificationPage />,
      },
      {
        path: "messages",
        element: <MessagesPage />,
      },
    ],
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

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
