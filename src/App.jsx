import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshThunk } from "./redux/auth/operations";
import { Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { RegisterForm } from "./components/RegisterForm/RegisterForm";
import { UploadPhoto } from "./components/UploadPhoto/UploadPhoto";

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? null : (
    <div>
      < RegisterForm/>
      <Routes>
     </Routes> 
    </div>
  );
};
export default App;
