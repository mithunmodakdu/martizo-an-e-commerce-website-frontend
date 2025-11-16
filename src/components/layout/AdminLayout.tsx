import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Outlet/>
    </div>
  );
}