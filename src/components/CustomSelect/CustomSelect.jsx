import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import s from "./CustomSelect.module.css";

const CustomSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.select} onClick={toggleDropdown}>
        <span>{value === "All" ? "All" : "Popular"}</span>
        <GoChevronDown className={isOpen ? s.iconOpen : s.icon} />
      </div>

      {isOpen && (
        <ul className={s.dropdown}>
          <li className={s.dropdownLi} onClick={() => handleSelect("all")}>
            All
          </li>
          <li className={s.dropdownLi} onClick={() => handleSelect("popular")}>
            Popular
          </li>
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
