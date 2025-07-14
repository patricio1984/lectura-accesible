import React, { ReactNode } from "react";

type Props = {
  title?: ReactNode;
  children: React.ReactNode;
  id?: string;
};

export const Section = ({ title, children, id }: Props) => {
  return (
    <section
      id={id}
      className="space-y-6 py-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {title && (
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};
