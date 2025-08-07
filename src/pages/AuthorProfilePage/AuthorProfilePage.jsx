import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

import { selectUser } from "../../redux/auth/selectors";
import {
  selectOwnArticles,
  selectOwnArticlesPagination,
  selectSavedArticles,
  selectSavedArticlesPagination,
  selectUserInfo,
} from "../../redux/user/selectors";

import {
  fetchOwnArticles,
  fetchSavedArticles,
  fetchUserInfo,
} from "../../redux/user/operations";

import ArticlesList from "../../components/ArticlesList/ArticlesList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import EmptyState from "../../components/EmptyState/EmptyState";
import Loader from "../../components/Loader/Loader";

import s from "./AuthorProfilePage.module.css";

const AuthorProfilePage = () => {
  const dispatch = useDispatch();
  const { id: authorId } = useParams();

  const currentUser = useSelector(selectUser);
  const isCurrentUser = currentUser?.id === authorId;

  const author = useSelector((state) => selectUserInfo(state, authorId));
  const ownArticles = useSelector(selectOwnArticles);
  const ownArticlesPagination = useSelector(selectOwnArticlesPagination);
  const savedArticles = useSelector(selectSavedArticles);
  const savedArticlesPagination = useSelector(selectSavedArticlesPagination);

  const defaultAvatar =
    "https://res.cloudinary.com/dbau4robp/image/upload/v1752140574/default-avatar_rfwfl3.png";

  const initialTab =
    isCurrentUser && sessionStorage.getItem("activeTab")
      ? sessionStorage.getItem("activeTab")
      : "own";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [page, setPage] = useState(1);
  const [allOwnArticles, setAllOwnArticles] = useState([]);
  const [allSavedArticles, setAllSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const lastFetch = useRef({ tab: "", page: 0 });

  useEffect(() => {
    const loadInit = async () => {
      try {
        await dispatch(fetchUserInfo(authorId));
        await dispatch(fetchOwnArticles({ userId: authorId, page: 1 }));
      } catch (err) {
        console.log(err);
      }
    };
    loadInit();
  }, [dispatch, authorId]);

  useEffect(() => {
    setAllOwnArticles([]);
    setAllSavedArticles([]);
    setPage(1);

    const loadInitial = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "saved" && isCurrentUser) {
          await dispatch(fetchSavedArticles(1));
        } else {
          await dispatch(fetchOwnArticles({ userId: authorId, page: 1 }));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadInitial();
  }, [dispatch, authorId, activeTab, isCurrentUser]);

  useEffect(() => {
    if (page === 1) return;
    if (lastFetch.current.tab === activeTab && lastFetch.current.page === page)
      return;

    lastFetch.current = { tab: activeTab, page };

    if (activeTab === "own") {
      dispatch(fetchOwnArticles({ userId: authorId, page }));
    } else {
      dispatch(fetchSavedArticles(page));
    }
  }, [page, activeTab, dispatch, authorId]);

  useEffect(() => {
    const incoming = activeTab === "own" ? ownArticles : savedArticles;
    const setAll =
      activeTab === "own" ? setAllOwnArticles : setAllSavedArticles;

    if (!incoming) return;

    setAll((prev) => {
      if (page === 1) {
        return Array.from(
          new Map(incoming.map((item) => [item._id, item])).values()
        );
      }

      const ids = new Set(prev.map((item) => item._id));
      const filtered = incoming.filter((item) => !ids.has(item._id));

      return filtered.length > 0 ? [...prev, ...filtered] : prev;
    });
  }, [ownArticles, savedArticles, page, activeTab]);

  const handleTabClick = async (tab) => {
    setActiveTab(tab);
    sessionStorage.setItem("activeTab", tab);
    setPage(1);

    const needsFetch =
      (tab === "own" && ownArticles.length === 0) ||
      (tab === "saved" && savedArticles.length === 0);

    if (needsFetch) {
      setIsLoading(true);
      try {
        if (tab === "own") {
          await dispatch(fetchOwnArticles({ userId: authorId, page: 1 }));
        } else {
          await dispatch(fetchSavedArticles(1));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const articles =
    activeTab === "saved" && isCurrentUser ? allSavedArticles : allOwnArticles;

  const hasNextPage =
    activeTab === "own"
      ? ownArticlesPagination?.hasNextPage
      : savedArticlesPagination?.hasNextPage;

  const handleLoadMore = () => {
    const nextPage =
      activeTab === "saved"
        ? savedArticlesPagination.page + 1
        : ownArticlesPagination.page + 1;

    if (activeTab === "saved") {
      dispatch(fetchSavedArticles(nextPage));
    } else {
      dispatch(fetchOwnArticles({ userId: authorId, page: nextPage }));
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={clsx("container", s.container)}>
          {isCurrentUser && <h1 className={s.title}>My Profile</h1>}

          <div className={s.header}>
            <img
              className={s.img}
              src={author?.avatarUrl || defaultAvatar}
              alt="avatar"
            />
            <div className="wrapper">
              <h2 className={s.name}>{author?.name}</h2>
              <p className={s.total}>
                {ownArticlesPagination.totalItems
                  ? `${ownArticlesPagination.totalItems} articles`
                  : `0 articles`}
              </p>
            </div>
          </div>

          {isCurrentUser && (
            <div className={s.tabs}>
              <button
                className={clsx(s.button, activeTab === "own" && s.active)}
                onClick={() => handleTabClick("own")}
              >
                My Articles
              </button>
              <button
                className={clsx(s.button, activeTab === "saved" && s.active)}
                onClick={() => handleTabClick("saved")}
              >
                Saved Articles
              </button>
            </div>
          )}

          {articles.length > 0 ? (
            <>
              <ArticlesList filteredArticles={articles} />
              {hasNextPage && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
            </>
          ) : (
            <EmptyState type={activeTab} />
          )}
        </div>
      )}
    </>
  );
};

export default AuthorProfilePage;
