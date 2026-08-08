import { NavLink } from "react-router-dom";
import { HomeIcon, GridIcon, UserIcon } from "./Icons";
import { student } from "../data/mockData";

export default function BottomNav() {
  const items = [
    { to: "/dashboard", label: "Home", icon: HomeIcon },
    { to: `/day/${student.currentDay}`, label: "Today", icon: GridIcon, match: "/day" },
    { to: "/profile", label: "Profile", icon: UserIcon },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-[480px] items-stretch justify-around">
        {items.map(({ to, label, icon: Icon, match }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) => {
              const active = match ? location.pathname.startsWith(match) : isActive;
              return `focus-ring flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                active ? "text-ember" : "text-muted-2"
              }`;
            }}
          >
            <Icon className="text-xl" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}