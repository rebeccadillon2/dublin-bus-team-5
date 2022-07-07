import React from "react";

export function ProgressSkeleton() {
  return (
    <div class='max-w-sm w-full mx-auto'>
      <div class='animate-pulse flex space-x-4'>
        <div class='flex-1 space-y-2 py-1'>
          <div class='h-8 bg-system-grey3 rounded-xl' />
          <div class='h-5 bg-system-grey3 max-w-[80%] rounded-xl' />
        </div>
      </div>
    </div>
  );
}
