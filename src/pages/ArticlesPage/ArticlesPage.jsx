import { useState } from "react";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import { dataBase } from "../../assets/data";
import { users } from "../../assets/user";
import s from "./ArticlesPage.module.css";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
// import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const ArticlesPage = () => {
  const [filter, setFilter] = useState("popular");

  const filteredArticles =
    filter === "popular"
      ? dataBase.filter((item) => item.rate >= 40)
      : dataBase;

  // const handleLoadMore = () => {
  //   setPage((prev) => prev + 1);
  // };

  return (
    <div className="container">
      <h1 className={s.articles}>Articles</h1>
      <div className={s.articles_box}>
        <p>{filteredArticles.length} articles</p>
        <CustomSelect value={filter} onChange={setFilter} />
      </div>
      <ArticlesList filteredArticles={filteredArticles} users={users} />
      {/* {page < totalPages && !isLoading && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )} */}
    </div>
  );
};

export default ArticlesPage;
