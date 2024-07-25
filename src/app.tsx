import { RouterProvider } from "react-router-dom";

import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./routes/layouts/default.layout";
import { HomePage } from "./routes/pages/home.page";
import { ThemeProvider } from "./components/theme-provider";

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
]);

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
