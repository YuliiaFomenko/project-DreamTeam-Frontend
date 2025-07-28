import { Link } from "react-router-dom";
import s from "./Header.module.css";
import logo from "../../assets/img/header/logo-@1x.webp";
import logoFull from "../../assets/img/header/logo-@2x.webp";
import Navigation from "../Navigation/Navigation";
import clsx from "clsx";
import UserMenu from "../UserMenu/UserMenu";
import AuthButtons from "../AuthButtons/AuthButtons";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useBodyLock } from "../../hooks/useBodyLock/useBodyLock";

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  // const isLogged = useSelector(selectIsLoggedIn);
  useBodyLock(isDrawerOpen);
  const isLogged = true;
  return (
    <header className={s.header}>
      <div className={clsx("container", s.headerContainer)}>
        <Link className={s.logo} to="/">
          <img
            src={logo}
            srcSet={`${logo} 1x, ${logoFull} 2x`}
            alt="Harmoniq Logo"
            className={s.logoImg}
            width="165"
            height="46"
          />
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
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 0.833374H18.5M1.5 12.8334H18.5M1.5 6.83337H18.5"
                  stroke="#374F42"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          )}
          {isDrawerOpen && (
            <button
              className={s.closeButton}
              onClick={() => setDrawerOpen(false)}
              aria-label="Close Menu"
            >
              <svg
                width="32"
                height="30"
                viewBox="0 0 32 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 4.33325L16 13.3333M16 13.3333L7 22.3333M16 13.3333L25 22.3333M16 13.3333L25 4.33325"
                  stroke="#070721"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
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
