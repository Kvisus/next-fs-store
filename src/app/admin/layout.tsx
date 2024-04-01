import { Nav, NavLink } from "@/components/Nav";
import React from "react";

// to not cashe the layout
export const dynamic = "force-dynamic";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/users">Products</NavLink>
        <NavLink href="/admin/products">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>
      <div className="contaiter my-6">{children}</div>
    </>
  );
};
export default AdminLayout;