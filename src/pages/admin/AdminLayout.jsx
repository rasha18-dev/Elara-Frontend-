import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
        <button onClick={() => setOpen(!open)} className="text-2xl font-bold">
          ☰
        </button>
      </div>

      <div className="flex">
        {/* ✅ Sidebar */}
        <aside
          className={`
            fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white border-r z-50
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          {/* sidebar header mobile */}
          <div className="md:hidden flex justify-between items-center px-4 py-3 border-b">
            <h2 className="font-bold">Admin</h2>
            <button onClick={() => setOpen(false)} className="text-xl">
              ✕
            </button>
          </div>

          <nav className="p-4 space-y-3 text-sm font-semibold">
            <Link
              to="/admin/dashboard"
              className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              to="/admin/products"
              className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Products
            </Link>

            <Link
              to="/admin/products/add"
              className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Add Product
            </Link>

            {/* ✅ ORDERS LINK ADDED */}
            <Link
              to="/admin/orders"
              className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Orders
            </Link>

            <Link
              to="/"
              className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Back to Site
            </Link>
          </nav>
        </aside>

        {/* ✅ Overlay (mobile only) */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        {/* ✅ Main content */}
        <main className="flex-1 p-4 md:p-6 md:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
