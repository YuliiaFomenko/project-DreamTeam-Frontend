import s from "./UserMenu.module.css";
import clsx from "clsx";
import sprite from "../../assets/img/sprite.svg";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

const UserMenu = ({ className, logoutClickHandle }) => {
  const user = useSelector(selectUser);
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
            src={user.avatarUrl}
            alt="User Logo"
            className={s.userLogo}
            width="32"
            height="32"
          />
          <p className={s.userName}>{user.name}</p>
        </div>
        <span className={s.spacer}></span>
        <button
          className={s.logout}
          aria-label="Log out"
          onClick={() => logoutClickHandle()}
        >
          <svg width="24" height="24" fill="none" stroke="var(--green-darker)">
            <use href={`${sprite}#icon-log-out`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
