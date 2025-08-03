import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Creators from "../../components/Creators/Creators";
import PopularArticles from "../../components/PopularArticles/PopularArticles";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <PopularArticles />
      <Creators />
    </main>
  );
};

export default HomePage;
