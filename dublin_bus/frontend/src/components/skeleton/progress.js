import React from "react";
import { useTheme } from "../../hooks";

export function ProgressSkeleton() {
  const [isDarkMode] = useTheme();
  const themeClasses = `${isDarkMode ? "bg-primary-black" : "bg-system-grey3"}`;

  return (
    <div class='max-w-sm w-full mx-auto'>
      <div className='animate-pulse flex space-x-4'>
        <div className='flex-1 space-y-2 py-1'>
          <div className={`h-8  rounded-xl ${themeClasses}`} />
          <div className={`h-5  max-w-[80%] rounded-xl ${themeClasses}`} />
        </div>
      </div>
    </div>
  );
}
