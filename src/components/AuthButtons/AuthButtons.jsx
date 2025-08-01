import { NavLink } from "react-router-dom";
import s from "./AuthButtons.module.css";
import clsx from "clsx";

const AuthButtons = ({ className }) => {
  return (
    <ul
      className={clsx(
        s.headerAuth,
        className === "header" ? s.authHeader : s.authMobile
      )}
    >
      <li>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            clsx(s.link, s.login, isActive && s.active)
          }
        >
          Log in
        </NavLink>
      </li>
      <li>
        <NavLink to="/register" className={clsx(s.registerLink, s.register)}>
          Join now
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthButtons;
