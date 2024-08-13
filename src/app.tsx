import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { GenericLayout } = await import("./routes/layouts/generic.layout");
      return { Component: GenericLayout };
    },
    children: [
      {
        path: "users/:id",
        async lazy() {
          const { ProfilePage } = await import("./routes/pages/profile.page");
          return { Component: ProfilePage };
        },
      },
      {
        path: "landing",
        async lazy() {
          const { LandingPage } = await import("./routes/pages/landing.page");
          return { Component: LandingPage };
        },
      },
    ],
  },
  {
    path: "/",
    async lazy() {
      const { AuthenticatedLayout } = await import(
        "./routes/layouts/authenticated.layout"
      );
      return { Component: AuthenticatedLayout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { HomePage } = await import("./routes/pages/home.page");
          return { Component: HomePage };
        },
      },
      {
        path: "notifications",
        async lazy() {
          const { NotificationPage } = await import(
            "./routes/pages/notifications.page"
          );
          return { Component: NotificationPage };
        },
      },
      {
        path: "messages",
        async lazy() {
          const { MessagesPage } = await import("./routes/pages/messages.page");
          return { Component: MessagesPage };
        },
      },
    ],
  },
  {
    path: "",
    async lazy() {
      const { AuthLayout } = await import("./routes/layouts/auth.layout");
      return { Component: AuthLayout };
    },
    children: [
      {
        path: "sign-in",
        async lazy() {
          const { SignInPage } = await import("./routes/pages/sign-in.page");
          return { Component: SignInPage };
        },
      },
      {
        path: "sign-up",
        async lazy() {
          const { SignUpPage } = await import("./routes/pages/sign-up.page");
          return { Component: SignUpPage };
        },
      },
      {
        path: "reset-password",
        async lazy() {
          const { ResetPasswordPage } = await import(
            "./routes/pages/reset-password.page"
          );
          return { Component: ResetPasswordPage };
        },
      },
      {
        path: "forgot-password",
        async lazy() {
          const { ForgotPasswordPage } = await import(
            "./routes/pages/forgot-password.page"
          );
          return { Component: ForgotPasswordPage };
        },
      },
      {
        path: "email-verification",
        async lazy() {
          const { EmailVerificationPage } = await import(
            "./routes/pages/email-verification.page"
          );
          return { Component: EmailVerificationPage };
        },
      },
      {
        path: "email-verification-token",
        async lazy() {
          const { EmailVerificationTokenPage } = await import(
            "./routes/pages/email-verification-token.page"
          );
          return { Component: EmailVerificationTokenPage };
        },
      },
      {
        path: "welcome",
        async lazy() {
          const { WelcomePage } = await import("./routes/pages/welcome.page");
          return { Component: WelcomePage };
        },
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
