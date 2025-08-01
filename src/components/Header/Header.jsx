import { Link } from "react-router-dom";
import s from "./Header.module.css";
import Navigation from "../Navigation/Navigation";
import clsx from "clsx";
import UserMenu from "../UserMenu/UserMenu";
import AuthButtons from "../AuthButtons/AuthButtons";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useBodyLock } from "../../hooks/useBodyLock/useBodyLock";
import sprite from "../../assets/img/sprite.svg";

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  // const isLogged = useSelector(selectIsLoggedIn);
  useBodyLock(isDrawerOpen);
  const isLogged = true;
  return (
    <header className={s.header}>
      <div className={clsx("container", s.headerContainer)}>
        <Link className={s.logo} to="/">
          <svg
            width="165"
            height="46"
            className={s.logoImg}
            stroke="var(--green)"
          >
            <use href={`${sprite}#icon-logo`} />
          </svg>
        </Link>
        <div className={s.headerNavigationWrapper}>
          <Navigation />
          {isLogged ? (
            <UserMenu className="header" />
          ) : (
            <AuthButtons className="header" />
          )}
          {!isDrawerOpen && (
            <button
              className={s.burger}
              onClick={() => setDrawerOpen(true)}
              aria-label="Burger Menu"
            >
              <svg width="32" height="32" stroke="var(--green-darker)">
                <use href={`${sprite}#icon-burger-regular`} />
              </svg>
            </button>
          )}
          {isDrawerOpen && (
            <button
              className={s.closeButton}
              onClick={() => setDrawerOpen(false)}
              aria-label="Close Menu"
            >
              <svg width="32" height="30" stroke="var(--black)">
                <use href={`${sprite}#icon-close`} />
              </svg>
            </button>
          )}
        </div>
      </div>
      <MobileMenu isOpen={isDrawerOpen} />
    </header>
  );
};

export default Header;
