import { Outlet } from "react-router-dom";

export function UnauthenticatedLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
