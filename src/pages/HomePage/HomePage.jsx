import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import PopularArticles from "../../components/PopularArticles/PopularArticles";
import Creators from "../../components/Creators/Creators";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <PopularArticles />
      <Creators />
    </>
  );
};

export default HomePage;
