import { ReactNode } from "react";

const categoryColors: Record<string, string> = {
  puja: "bg-saffron-tint text-saffron border-saffron/20",
  astrology: "bg-gold/10 text-gold border-gold/20",
  vastu: "bg-maroon/8 text-maroon border-maroon/15",
  meditation: "bg-blue-50 text-blue-700 border-blue-100",
  havan: "bg-orange-50 text-orange-700 border-orange-100",
  default: "bg-saffron-tint text-saffron border-saffron/20",
};

interface BadgeProps {
  children: ReactNode;
  category?: string;
  className?: string;
}

export default function Badge({ children, category = "default", className = "" }: BadgeProps) {
  const colors = categoryColors[category.toLowerCase()] ?? categoryColors.default;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-pill text-label-sm font-label border ${colors} ${className}`}>
      {children}
    </span>
  );
}
