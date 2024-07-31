import { RouterProvider } from "react-router-dom";

import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./routes/layouts/default.layout";
import { HomePage } from "./routes/pages/home.page";
import { ThemeProvider } from "./components/theme-provider";
import { SignInPage } from "./routes/pages/sign-in.page";
import { SignUpPage } from "./routes/pages/sign-up.page";
import { MessagesPage } from "./routes/pages/messages.page";
import { LandingPage } from "./routes/pages/landing.page";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/toaster";
import { ProfilePage } from "./routes/pages/profile.page";
import { WelcomePage } from "./routes/pages/welcome.page";
import { AuthLayout } from "./routes/layouts/auth.layout";
import { EmailVerificationPage } from "./routes/pages/email-verification.page";
import { ForgotPasswordPage } from "./routes/pages/forgot-password.page";
import { ResetPasswordPage } from "./routes/pages/reset-password.page";
import { NotificationPage } from "./routes/pages/notifications.page";
import { EmailVerificationTokenPage } from "./routes/pages/email-verification-token.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "notifications",
        element: <NotificationPage />,
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
  {
    path: "landing",
    element: <LandingPage />,
  },
  {
    path: "messages",
    element: <MessagesPage />,
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
