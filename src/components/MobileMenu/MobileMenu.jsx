import clsx from "clsx";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import s from "./MobileMenu.module.css";
import AuthButtons from "../AuthButtons/AuthButtons";

const MobileMenu = ({ isOpen }) => {
  // const isLogged = useSelector(selectIsLoggedIn);
  const isLogged = true;
  return (
    <div className={clsx(s.drawer, isOpen && s.open)}>
      <div className={clsx("container", s.mobileMenuContainer)}>
        <Navigation />
        {isLogged ? (
          <UserMenu className="mobile" />
        ) : (
          <AuthButtons className="mobile" />
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
