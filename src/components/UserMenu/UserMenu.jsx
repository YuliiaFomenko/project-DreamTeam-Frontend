import s from "./UserMenu.module.css";
import clsx from "clsx";
import userLogo from "../../assets/img/header/user-logo.jpg";

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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.80769 4.875L7.06731 4.875C5.85653 4.875 4.875 5.85653 4.875 7.06731L4.875 16.9327C4.875 18.1435 5.85653 19.125 7.06731 19.125H9.80769M8.625 12L19.5865 12M19.5865 12L16.2981 15.2885M19.5865 12L16.2981 8.71154"
              stroke="#374F42"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
