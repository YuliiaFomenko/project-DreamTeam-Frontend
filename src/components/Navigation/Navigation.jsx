import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";
import { useSelector } from "react-redux";

const Navigation = () => {
  // const isLogged = useSelector(selectIsLoggedIn);
  const isLogged = true;
  return (
    <nav className={s.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => clsx(s.link, isActive && s.active)}
      >
        Home
      </NavLink>
      <NavLink
        to="/articles"
        className={({ isActive }) => clsx(s.link, isActive && s.active)}
      >
        Articles
      </NavLink>
      <NavLink
        to="/creators"
        className={({ isActive }) => clsx(s.link, isActive && s.active)}
      >
        Creators
      </NavLink>
      {isLogged && (
        <NavLink
          to="/profile"
          className={({ isActive }) => clsx(s.link, isActive && s.active)}
        >
          My profile
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
