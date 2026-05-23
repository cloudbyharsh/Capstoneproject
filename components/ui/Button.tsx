import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: ReactNode;
}

const variants = {
  primary: "bg-maroon text-ivory hover:bg-maroon-hover hover:shadow-gold-glow",
  secondary: "bg-transparent border border-maroon text-maroon hover:bg-maroon hover:text-ivory",
  ghost: "bg-transparent text-charcoal-muted hover:text-charcoal",
  gold: "bg-gold text-charcoal font-semibold hover:bg-gold/90 hover:shadow-gold-glow",
};

const sizes = {
  sm: "px-4 py-2 text-label-md",
  md: "px-6 py-2.5 text-label-md",
  lg: "px-8 py-3.5 text-body-md",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-pill font-label transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
