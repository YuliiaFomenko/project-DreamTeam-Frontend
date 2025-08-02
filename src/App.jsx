import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshThunk } from "./redux/auth/operations";
import Routes from "./components/Routes/RouterSet.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { UploadPhoto } from "./components/UploadPhoto/UploadPhoto.jsx";
import { Route } from "react-router-dom";


const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? <Loader />: <Routes></Routes>
};
export default App;
