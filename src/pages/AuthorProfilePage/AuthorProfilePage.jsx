import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../redux/auth/selectors";
import { selectOwnArticles, selectOwnArticlesPagination, selectSavedArticles, selectSavedArticlesPagination, selectUserInfo } from "../../redux/user/selectors";
import { useState } from "react";
import { useEffect } from "react";
import { fetchOwnArticles, fetchSavedArticles } from "../../redux/user/operations";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import s from "./AuthorProfilePage.module.css"
import clsx from "clsx";
import EmptyState from "../../components/EmptyState/EmptyState";


const AuthorProfilePage = () => {
  const dispatch = useDispatch();
  const {id: authorId } = useParams();
  const currentUser = useSelector(selectUser);
  const isCurrentUser = currentUser?.id === authorId;
  const author = useSelector((state) => selectUserInfo(state, authorId));
  const ownArticles = useSelector(selectOwnArticles);
  const ownArticlesPagination = useSelector(selectOwnArticlesPagination);
  const savedArticles = useSelector(selectSavedArticles);
  const savedArticlesPagination = useSelector(selectSavedArticlesPagination);

  const defaultAvatar = "https://res.cloudinary.com/dbau4robp/image/upload/v1752140574/default-avatar_rfwfl3.png"

  const [activeTab, setActiveTab] = useState('own');

  useEffect(() => {
    dispatch(fetchOwnArticles({ userId: authorId, page: 1 }));
  }, [authorId, dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if(tab === 'own' && ownArticles.length === 0) {
      dispatch(fetchOwnArticles({ userId: authorId, page: 1 }));
    }
    if(tab ==='saved' && savedArticles.length === 0) {
      dispatch(fetchSavedArticles(1))
    }
  };

  const handleLoadMore = () => {
    const pagination = activeTab === 'saved' ? savedArticlesPagination : ownArticlesPagination;
    const page = pagination.page + 1;
    if( activeTab === 'saved') {
      dispatch(fetchSavedArticles(page))
    } else {
      dispatch(fetchOwnArticles({ userId: authorId, page }));
    }
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  const articles = isCurrentUser && activeTab === "saved" ? savedArticles : ownArticles;

  return (
    <div className={clsx("container", s.container)}>
      <div className={s.header}>
        <img className={s.img} src={author?.avatarUrl || defaultAvatar} alt="avatar" />
        <div className="wrapper">
          <h2 className={s.name}>{author?.name}</h2>
          <p className={s.total}>{ownArticlesPagination.totalItems} articles</p>
        </div>
      </div>

      {isCurrentUser && (
        <div className={s.tabs}>
          <button 
            className={clsx(s.button, (activeTab === "own" ? s.active : ""))}
            onClick={() => handleTabClick('own')}
            >
              My Articles
          </button>
          <button 
            className={clsx(s.button, (activeTab === "saved" ? s.active : ""))}
            onClick={() => handleTabClick('saved')}
          >
            Saved Articles
          </button>
        </div>
      )}

      {articles.length > 0 ? (
        <>
          <ArticlesList filteredArticles={articles} />
  
        <LoadMoreBtn handleLoadMore={handleLoadMore}/>
        </>
    ) : (
      <EmptyState type={activeTab}/>
    )
    }
      

    </div>
  );
};

export default AuthorProfilePage;
