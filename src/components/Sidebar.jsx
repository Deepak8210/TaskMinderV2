import {
  FolderOpen,
  Star,
  Columns3,
  CircleAlert,
  ArrowUp,
  Settings,
  CircleQuestionMark,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const sidebarMyList = [
  {
    label: "Work",
    path: "/work",
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Home",
    path: "/",
  },
];
const sidebarSmartViews = [
  {
    label: "Today",
    icon: Star,
    path: "tasks/today",
  },
  {
    label: "This Week",
    icon: Columns3,
    path: "/tasks/weekly",
  },
  {
    label: "Overdue",
    icon: CircleAlert,
    path: "/overdue",
  },
  {
    label: "High Priority",
    icon: ArrowUp,
    path: "/high-priority",
  },
];

const extraLinks = [
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    label: "Help & Support",
    icon: CircleQuestionMark,
    path: "/support",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-[17%] bg-card-dark border-r border-border-dark p-4 pl-6 flex flex-col">
      <div className="flex gap-3 mb-4 w-full">
        <div
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDiqoZoTy9B3AauzTYOEceUY3Gz69aT1n_hGbC1AfJqYh9ZnsZFTeLKzISo6s-w0URxWpWBcssKj-zcE9NtNdZSffIREjKPentb-0Y52kkg_pmreEFKC-ZhqTdjSOloM-vKMZOgMVTh7pHusbrKJ7rByJH0C3gcgBi086nJgALd1RqLNCkpju60GeuqdG8s5WZ6kMkTtqzfeY0Jo4zkNs1KiZjWVA97Gcot6Iz6bJnG0Uew83btucB_6jaVGMmXo55pkUYyUp1Sr98z')`,
          }}
          className="size-12 bg-cover border rounded-full"
        ></div>
        <div className="">
          <h1 className="text-base font-semibold text-text-dark">
            Deepak Rajput
          </h1>
          <p className="text-muted-dark text-sm font-normal">
            deepak@gmail.com
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <p className="py-2 text-xs font-bold uppercase text-muted-dark tracking-wider">
          MY LISTS
        </p>
        {sidebarMyList?.map(({ label, path }, i) => (
          <NavLink
            key={i}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded 
     ${
       isActive
         ? "bg-primary/20 text-primary font-semibold"
         : "hover:bg-primary/10 text-text-dark"
     }`
            }
          >
            <span className="material-symbols-outlined ">
              <FolderOpen size={22} />
            </span>
            <p className="text-sm font-semibold">{label}</p>
          </NavLink>
        ))}
      </div>
      <div className="flex flex-col gap-1 mt-6">
        <p className="py-2 text-xs font-bold uppercase text-muted-dark tracking-wider">
          SMART VIEWS
        </p>
        {sidebarSmartViews?.map(({ label, icon, path }, i) => {
          const Icon = icon;
          return (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded 
     ${
       isActive
         ? "bg-primary/20 text-primary font-semibold"
         : "hover:bg-primary/10 text-text-dark"
     }`
              }
            >
              <span className="">
                <Icon size={22} />
              </span>

              <p className="text-sm font-semibold">{label}</p>
            </NavLink>
          );
        })}
      </div>
      <div className="flex flex-col gap-1 mt-auto">
        {extraLinks?.map(({ label, icon, path }, i) => {
          const Icon = icon;
          return (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded 
     ${
       isActive
         ? "bg-primary/20 text-primary font-semibold"
         : "hover:bg-primary/10 text-text-dark"
     }`
              }
            >
              <span className="material-symbols-outlined">
                <Icon size={22} />
              </span>
              <p className="text-sm font-semibold">{label}</p>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
