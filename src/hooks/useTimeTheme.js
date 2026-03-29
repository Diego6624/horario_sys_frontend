import { useState, useEffect } from "react";

const getTheme = () => {
  const h = new Date().getHours();
  return h >= 6 && h < 18 ? "dark" : "ligth";
};

const useTimeTheme = () => {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const interval = setInterval(() => setTheme(getTheme()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return theme; // "light" | "dark"
};

export default useTimeTheme;