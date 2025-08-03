import clsx from "clsx";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import { useSelector } from "react-redux";
import s from "./MobileMenu.module.css";
import AuthButtons from "../AuthButtons/AuthButtons";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const MobileMenu = ({ isOpen, logoutClickHandle, closeDrawer }) => {
  const isLogged = useSelector(selectIsLoggedIn);

  return (
    <div className={clsx(s.drawer, isOpen && s.open)}>
      <div className={clsx("container", s.mobileMenuContainer)}>
        <div className={s.mobileWrapper}>
          <Navigation />
          {isLogged ? (
            <UserMenu
              className="mobile"
              logoutClickHandle={logoutClickHandle}
            />
          ) : (
            <AuthButtons className="mobile" />
          )}
        </div>
      </div>
      <div className={s.popover} onClick={() => closeDrawer()}></div>
    </div>
  );
};

export default MobileMenu;
