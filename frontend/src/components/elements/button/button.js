import React from "react";
import { Link } from "react-router-dom";

import { useTheme } from "../../../hooks";

const getType = (type) => {
  switch (type) {
    case "large": {
      return "w-full px-4 py-4 min-h-15 text-title tracking-title leading-title";
    }
    case "action": {
      return "px-3 py-1.5 text-subtitle tracking-subtitle leading-subtitle";
    }
    default: {
      return "px-3 py-1.5  text-subtitle tracking-subtitle leading-subtitle";
    }
  }
};

const BaseButton = ({ href, children, ...rest }) => {
  if (href && href.startsWith("/")) {
    return (
      <Link to={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return <button {...rest}>{children}</button>;
};

export const PrimaryButton = (props) => {
  const { type, className, ...rest } = props;
  const base = `inline-flex items-center justify-center rounded-xl transition-all ease-in-out text-primary-white font-inter bg-primary-blue hover:bg-light-blue1 hover:text-primary-white active:bg-primary-blue active:text-dark-blue1 disabled:bg-dark-blue2 disabled:text-primary-blue`;
  const classes = `${base} ${className} ${getType(type)}`;

  return (
    <BaseButton className={classes} {...rest}>
      {props.children}
    </BaseButton>
  );
};

export const SecondaryButton = (props) => {
  const { type, className, ...rest } = props;
  const [isDarkMode] = useTheme();

  const base = `inline-flex items-center justify-center rounded-default font-inter transition-all ease-in-out`;
  const theme = `${
    isDarkMode
      ? "text-system-grey2 bg-system-grey6 hover:bg-system-grey5 hover:text-system-grey7 active:bg-system-grey5 active:text-system-grey3 disabled:bg-system-grey5 disabled:text-system-grey4"
      : "text-system-grey7 bg-system-grey2 hover:bg-system-grey2 hover:text-system-grey6 active:bg-system-grey2 active:text-system-grey5 disabled:bg-system-grey5 disabled:text-system-grey4"
  }`;
  const classes = `${base} ${className} ${getType(type)} ${theme}`;

  return (
    <BaseButton className={classes} {...rest}>
      {props.children}
    </BaseButton>
  );
};

export const DestructiveButton = (props) => {
  const { type, className, ...rest } = props;
  const [isDarkMode] = useTheme();

  const base = `inline-flex items-center justify-center rounded-default transition-all ease-in-out text-primary-white font-inter  hover:text-primary-white active:bg-dark-red2 active:text-light-red1 disabled:bg-dark-red2 disabled:text-dark-red1`;
  const theme = `${
    isDarkMode
      ? "bg-dark-red2 hover:bg-dark-red1"
      : "bg-dark-red1 hover:bg-primary-red"
  }`;
  const classes = `${base} ${className} ${getType(type)} ${theme}`;

  return (
    <BaseButton className={classes} {...rest}>
      {props.children}
    </BaseButton>
  );
};
