import s from "./UserMenu.module.css";
import clsx from "clsx";
import userLogo from "../../assets/img/header/user-logo.jpg";
import sprite from "../../assets/img/sprite.svg";

const UserMenu = ({ className }) => {
  return (
    <div
      className={clsx(
        s.userMenu,
        className === "header" ? s.menuHeader : s.menuMobile
      )}
    >
      <button className={s.createArticle}>Create an article</button>
      <div className={s.userInfo}>
        <div className={s.user}>
          <img
            src={userLogo}
            srcSet={`${userLogo} 1x, ${userLogo} 2x`}
            alt="User Logo"
            className={s.userLogo}
            width="32"
            height="32"
          />
          <p className={s.userName}>Naomi</p>
        </div>
        <span className={s.spacer}></span>
        <button className={s.logout} aria-label="Log out">
          <svg width="24" height="24" fill="none" stroke="var(--green-darker)">
            <use href={`${sprite}#icon-log-out`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
