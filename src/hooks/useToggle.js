import React from "react";

export default function useToggle(defaultValue = false) {
  const [toggle, setToggle] = React.useState(false);

  const toggleSwitch = () => {
    setToggle((prev) => !prev);
  };

  return [toggle, toggleSwitch];
}
