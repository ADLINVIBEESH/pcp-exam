import { NavLink, Outlet } from "react-router-dom";

const navLinks = [
  { to: "/orders", label: "Orders" },
  { to: "/filter", label: "Filter" },
  { to: "/stats", label: "Stats" },
];

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Food Delivery Dashboard</p>
        </div>

        <nav className="top-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
