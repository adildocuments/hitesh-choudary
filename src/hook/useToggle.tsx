import { useState } from "react";

type useToggleReturn = [boolean, () => void];

const useToggle = (initialState = true): useToggleReturn => {
  const [toggle, setToggle] = useState(initialState);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return [toggle, handleToggle];
};

export default useToggle;
