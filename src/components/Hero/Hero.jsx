import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import s from "./Hero.module.css";
import clsx from "clsx";

const Hero = () => {
  // const isLogged = useSelector(selectIsLoggedIn);
  const isLogged = false;
  return (
    <section className={clsx("container", s.hero)}>
      <div className={s.heroContainer}>
        <div className={s.content}>
          <h1 className={s.title}>
            Find your <span>harmony</span> in community
          </h1>
          <div className={s.buttons}>
            <a href="#popular-articles" className={s.articlesButton}>
              Go to Articles
            </a>
            {!isLogged && (
              <Link to="/register" className={s.registerButton}>
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
