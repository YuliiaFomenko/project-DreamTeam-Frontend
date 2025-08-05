import { Link } from "react-router-dom";
import s from "./EmptyState.module.css";
import { FiAlertCircle } from "react-icons/fi";

const EmptyState = ({ type }) => {
  const isOwn = type === "own";

  return (
    <div className={s.wrapper}>
      <FiAlertCircle className={s.icon} />
      <h3 className={s.title}>Nothing found.</h3>
      <p className={s.text}>{isOwn ? "Write your first article" : "Save your first article"}</p>
      <div className={s.buttonWrapper}>
        <Link to={isOwn ? "/create" : "/articles"}>
          <button className={s.button}>{isOwn ? "Create an article" : "Go to articles"}</button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
