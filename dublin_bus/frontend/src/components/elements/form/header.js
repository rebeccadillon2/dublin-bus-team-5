import React from "react";

export function FormHeader(props) {
  const { title, ...rest } = props;
  const classes = `flex flex-col items-center justify-center`;

  return (
    <div className={classes} {...rest}>
      <img
        alt={"logo"}
        className='block'
        height={70}
        width={70}
        style={{ height: "70px", width: "70px" }}
        src={
          "https://res.cloudinary.com/dk0r9bcxy/image/upload/v1654877396/research-practicum/bl2e_qkc1u6.png"
        }
      />
      <p className='text-2xl font-semibold pb-6 pt-2'>{title}</p>
    </div>
  );
}
