"use client";

import { useState } from "react";
import { Label } from "./ui/Label";
import { Switch } from "./ui/Switch";
import { Icons } from "./Icons";

const DarkModeSwitch = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (isDark === false) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.toggle("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-slate-400 stroke-white text-white text-white px-2 py-1 rounded-[2vh]">
      <Switch
        className="bg-slate-700 text-white dark:bg-white dark:text-white border-slate-900"
        checked={isDark}
        onCheckedChange={() => toggleDarkMode()}
      />
      {isDark ? (
        <Label htmlFor="dark mode?">
          <Icons.moon className="h-8 w-8 " />
        </Label>
      ) : (
        <Label htmlFor="ligth mode?">
          <Icons.sun className="h-8 w-8 " />
        </Label>
      )}
    </div>
  );
};

export default DarkModeSwitch;