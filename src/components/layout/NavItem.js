import { NavLink } from "react-router-dom";

const NavItem = ({ NavItemData, setShowSideBar }) => {
  const { label, href, icon, activeIcon } = NavItemData;

  return (
    <NavLink
      to={href}
      onClick={() => {
        setShowSideBar(false);
      }}
    >
      {({ isActive }) => (
        <div
          className={`flex items-center justify-between w-full rounded-xl py-2 space-x-4 ${isActive ? " text-Chinese-Blue " : "text-Light-Slate-Gray"
            }`}
        >
          <div>{isActive ? <>{activeIcon}</> : <>{icon}</>}</div>
          <h1 className={`flex-1 text-base ${isActive ? "font-semibold " : " font-normal"}`}>{label}</h1>
          {/* {label === "Rewards" && (
            <h3
              className={`rounded-full px-3 py-0.5 text-xs bg-Chinese-Blue text-Pure-White`}
            >
              1214
            </h3>
          )} */}
        </div>
      )}
    </NavLink>
  );
};

export default NavItem;
