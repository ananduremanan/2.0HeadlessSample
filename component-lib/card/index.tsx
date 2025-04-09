import React, { ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  cardClass?: string;
}

export function Card({ children, cardClass = "rounded-xl p-4 border border-gray-300 w-full" }: CardProps) {
  return <div className={cardClass}>{children}</div>;
}
