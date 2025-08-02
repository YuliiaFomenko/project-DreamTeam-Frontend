import React from "react";
import { useDispatch } from "react-redux";
import { addToSaved } from "../../redux/user/operations.js";
import { refreshThunk } from "../../redux/auth/operations.js";

const ArticlesPage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div>ArticlesPage</div>
      <button
        onClick={() => {
          //dispatch(refreshThunk());
          dispatch(addToSaved("68498236a100312bea078fea"));
        }}
      >
        Click Me
      </button>
    </>
  );
};

export default ArticlesPage;
