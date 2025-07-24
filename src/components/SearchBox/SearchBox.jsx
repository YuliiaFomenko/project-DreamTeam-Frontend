import React from "react";
import s from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from '../../redux/filters/slice';

const SearchBox = () => {

  const filter = useSelector(state=> state.filter.filter.name)

  const dispatch = useDispatch()

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  
  return (
    <div className={s.searchBox}>
      <p>Find contacts by name</p>
      <input type="text" name="filter" placeholder="Search..." value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default SearchBox;
