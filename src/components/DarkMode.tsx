"use client";

import { FC, useState } from "react";
import { Icons } from "./Icons";

interface DarkModeProps {}

const DarkMode: FC<DarkModeProps> = ({}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    const isDark = !isDarkMode;
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  };

  return (
    <div className="flex flex-row items-center gap-1 bg-slate-400 rounded-sm" onClick={toggleDarkMode}>
      {isDarkMode ? (
        <Icons.sun className="sm:h-5 sm:w-5 dark:stroke-white" />
      ) : (
        <Icons.moon className="sm:h-5 sm:w-5 dark:stroke-white" />
      )}
    </div>
  );
};

export default DarkMode;
