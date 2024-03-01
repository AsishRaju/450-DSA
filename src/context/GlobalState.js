import React, { useState } from "react";
import { GlobalContext } from "./GlobalContext";

const GlobalState = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  // if dark theme is enabled or not
  const [dark, setDark] = useState(false);
  const [progress, setProgress] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        progress,
        setProgress,
        dark,
        setDark,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
