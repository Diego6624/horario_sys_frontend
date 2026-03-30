import { useState, useEffect } from "react";

const getTheme = () => {
  const h = new Date().getHours();
  return h >= 6 && h < 18 ? "ligth" : "dark";
};

const useTimeTheme = () => {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const interval = setInterval(() => setTheme(getTheme()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return theme;
};

export default useTimeTheme;