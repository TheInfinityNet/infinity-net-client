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

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "sign-in",
    element: <SignInPage />,
  },
  {
    path: "sign-up",
    element: <SignUpPage />,
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
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
