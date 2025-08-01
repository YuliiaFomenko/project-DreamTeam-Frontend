import s from "./About.module.css";
import clsx from "clsx";
import imgMob from "../../assets/img/about/about-first-mob-@1x.webp";
import imgMobRet from "../../assets/img/about/about-first-mob-@2x.webp";
import imgTab from "../../assets/img/about/about-first-tab-@1x.webp";
import imgTabRet from "../../assets/img/about/about-first-tab-@2x.webp";
import imgDesk from "../../assets/img/about/about-first-desk-@1x.webp";
import imgDeskRet from "../../assets/img/about/about-first-desk-@2x.webp";
import imgSecondMob from "../../assets/img/about/about-second-mob-@1x.webp";
import imgSecondMobRet from "../../assets/img/about/about-second-mob-@2x.webp";
import imgSecondTab from "../../assets/img/about/about-second-tab-@1x.webp";
import imgSecondTabRet from "../../assets/img/about/about-second-tab-@2x.webp";
import imgSecondDesk from "../../assets/img/about/about-second-desk-@1x.webp";
import imgSecondDeskRet from "../../assets/img/about/about-second-desk-@2x.webp";
import imgThirdDesk from "../../assets/img/about/about-third-desk-@1x.webp";
import imgThirdDeskRet from "../../assets/img/about/about-third-desk-@2x.webp";

const About = () => {
  return (
    <section className={s.about}>
      <div className={clsx("container", s.aboutContainer)}>
        <div className={s.top}>
          <div className={s.textWrapper}>
            <h2 className={s.title}>About us</h2>
            <p className={s.description}>
              Harmoniq is a mindful publishing platform dedicated to mental
              health and well-being. We bring together writers, thinkers, and
              readers who believe that open, thoughtful stories can heal,
              inspire, and connect. Whether you're here to share your journey or
              learn from others — this is your space to slow down, reflect, and
              grow.
            </p>
          </div>
          <picture className={s.first}>
            <source
              srcSet={imgDeskRet}
              media="(min-width: 1440px) and (min-resolution: 192dpi)"
            />
            <source srcSet={imgDesk} media="(min-width: 1440px)" />
            <source
              srcSet={imgTabRet}
              media="(min-width: 768px) and (max-width: 1439px) and (min-resolution: 192dpi)"
            />
            <source
              srcSet={imgTab}
              media="(min-width: 768px) and (max-width: 1439px)"
            />
            <source
              srcSet={imgMobRet}
              media="(max-width: 767px) and (min-resolution: 192dpi)"
            />
            <source srcSet={imgMob} media="(max-width: 767px)" />
            <img
              src={imgMob}
              alt="About abstract"
              width="361"
              height="365"
              className={s.firstImg}
            />
          </picture>
        </div>
        <div className={s.bottom}>
          <picture className={s.second}>
            <source
              srcSet={imgSecondDeskRet}
              media="(min-width: 1440px) and (min-resolution: 192dpi)"
            />
            <source srcSet={imgSecondDesk} media="(min-width: 1440px)" />
            <source
              srcSet={imgSecondTabRet}
              media="(min-width: 768px) and (max-width: 1439px) and (min-resolution: 192dpi)"
            />
            <source
              srcSet={imgSecondTab}
              media="(min-width: 768px) and (max-width: 1439px)"
            />
            <source
              srcSet={imgSecondMobRet}
              media="(max-width: 767px) and (min-resolution: 192dpi)"
            />
            <source srcSet={imgSecondMob} media="(max-width: 767px)" />
            <img
              src={imgSecondMob}
              alt="About abstract"
              width="361"
              height="365"
              className={s.secondImg}
            />
          </picture>
          <picture className={s.third}>
            <source
              srcSet={imgThirdDeskRet}
              media="(min-width: 1440px) and (min-resolution: 192dpi)"
            />
            <source srcSet={imgThirdDesk} media="(min-width: 1440px)" />
            <img
              src={imgThirdDesk}
              alt="About abstract"
              width="392"
              height="398"
              className={s.thirdImg}
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default About;
