import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshThunk } from "./redux/auth/operations";
import { Routes, Route  } from "react-router-dom";
import Header from "./components/Header/Header";
import AuthorsPage from "./pages/AuthorsPage/AuthorsPage";


const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? null : (
    <div>
      <Routes>
        <Route path='authors' element={
          <PrivateRoute>
            <AuthorsPage />
        </PrivateRoute>} />
     </Routes>
    </div>
  );
};
export default App;
