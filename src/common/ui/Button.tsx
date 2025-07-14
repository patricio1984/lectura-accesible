import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...rest }: Props) => (
  <button
    className="cursor-pointer text-xl px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50 transition"
    {...rest}
  >
    {children}
  </button>
);
