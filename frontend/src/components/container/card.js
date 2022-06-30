import React from "react";

export function Card(props) {
  const { children, isFirst, isLast, className, ...rest } = props;
  const top = `${isFirst && "rounded-t-default"}`;
  const bottom = `${isLast && "rounded-b-default"}`;
  const base = `col-span-1 shadow list-none w-full flex items-center justify-between px-4 py-6`;
  const classes = `${base} ${top} ${bottom} ${className}`;

  return (
    <li className={classes} {...rest}>
      {children}
    </li>
  );
}
