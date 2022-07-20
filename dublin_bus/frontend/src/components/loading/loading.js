import React from "react";

export function LoadingSpinner(props) {
  const { color, size, ...rest } = props;

  const base = `border-solid rounded-full animate-spin`;
  const loaderColor = color ? `${color}` : "border-primary-blue";
  const loaderSize = size === "small" ? "w-4 h-4 border-2" : "w-8 h-8 border-4";
  const loaderClasses = `${base} ${loaderColor} ${loaderSize}`;

  return (
    <div className='flex h-full items-center justify-center' {...rest}>
      <div
        style={{ borderTopColor: "transparent" }}
        className={loaderClasses}
      />
    </div>
  );
}
