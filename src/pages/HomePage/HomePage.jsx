import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import PopularArticles from "../../components/PopularArticles/PopularArticles";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <PopularArticles />
    </main>
  );
};

export default HomePage;
