import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshThunk } from "./redux/auth/operations";
import { Routes, Route } from "react-router-dom"; // 🔧 Додали Route
import Header from "./components/Header/Header";
import HomePage from './pages/HomePage/HomePage';
// import CreatorsPage from './pages/CreatorsPage/CreatorsPage'; // ← якщо існує

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? null : (
    <div>
      <Header />
      <Routes>

      </Routes>
    </div>
  );
};

export default App;
