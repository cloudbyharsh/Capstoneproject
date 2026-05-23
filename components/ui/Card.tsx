import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-white rounded-card shadow-card ${hover ? "hover:shadow-card-hover transition-shadow duration-300" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
