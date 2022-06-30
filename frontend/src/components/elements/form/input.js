import React from "react";
import { useTheme } from "../../../hooks";

export function Input(props) {
  const {
    variant,
    error,
    value,
    label,
    className,
    specialTheme,
    specialWidth,
    ref,
    ...rest
  } = props;
  const [isDarkMode] = useTheme();
  const base = `flex flex-col-reverse items-start justify-center max-w-122 ${
    specialWidth ? "w-100" : "w-80"
  } rounded-xl px-3 ${
    isDarkMode
      ? specialTheme
        ? "bg-system-grey7"
        : "bg-primary-black"
      : specialTheme
      ? "bg-system-grey2"
      : "bg-system-grey1"
  } font-inter`;
  const extra = `${variant === "large" ? " h-17" : "h-11"}`;
  const classes = `${base} ${className} ${extra}`;

  const labelBase = `block text-caption1 tracking-caption1 leading-caption1 font-medium ${
    isDarkMode ? "text-system-grey5" : "text-system-grey7"
  } peer-focus:text-primary-blue`;
  // const labelVariant = `${variant === 'large' ? '' : 'mb-n-1'}`;
  const labelVariant = `${variant === "large" ? "" : ""}`;
  const labelExtra = `${
    !value
      ? "no-value "
      : error
      ? "value-&-error text-primary-red"
      : `value-&-no-error `
  }`;
  const labelClasses = `${labelBase} ${labelExtra} ${labelVariant}`;

  const inputBase = `peer block w-full border-0 p-0 caret-system-grey5 focus:caret-primary-blue focus:outline-none 
  ${
    isDarkMode
      ? specialTheme
        ? "bg-system-grey7 text-primary-white"
        : "bg-primary-black text-primary-white"
      : specialTheme
      ? "bg-system-grey2 text-system-grey7"
      : "bg-system-grey1 text-system-grey7"
  }
  placeholder-system-grey4 focus:placeholder-primary-blue hover:placeholder-primary-blue focus:ring-0 text-body tracking-body leading-body`;
  const inputExtra = ` ${
    !value
      ? "no-value"
      : error
      ? "value-&-error caret-primary-red"
      : "value-&-no-error"
  }`;
  const inputClasses = `${inputBase} ${inputExtra}`;

  return (
    <div className={classes}>
      <input ref={ref} className={inputClasses} value={value} {...rest} />
      {value && (
        <label htmlFor='name' className={`${labelClasses} truncate`}>
          {label}
          {error && (
            <p className='text-xs inline-block pl-1 text-system-grey5'>
              {error.charAt(0).toUpperCase() + error.slice(1)}
            </p>
          )}
        </label>
      )}
    </div>
  );
}
