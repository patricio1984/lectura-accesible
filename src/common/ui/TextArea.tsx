import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
};

export const TextArea = ({ label, id, ...rest }: Props) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-lg font-medium">
      {label}
    </label>
    <textarea
      id={id}
      className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring"
      rows={5}
      {...rest}
    />
  </div>
);
