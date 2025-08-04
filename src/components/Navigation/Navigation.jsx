import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";

const Navigation = () => {
  const isLogged = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
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
        to="/authors"
        end
        className={({ isActive }) => clsx(s.link, isActive && s.active)}
      >
        Creators
      </NavLink>
      {isLogged && (
        <NavLink
          to={`/authors/${user.id}`}
          className={({ isActive }) => clsx(s.link, isActive && s.active)}
        >
          My profile
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
