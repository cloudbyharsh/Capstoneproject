import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}

export default function StarRating({ rating, count, size = "sm" }: StarRatingProps) {
  const starSize = size === "sm" ? 13 : 16;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={starSize}
            className={i <= Math.round(rating) ? "fill-gold text-gold" : "text-charcoal-subtle/30"}
          />
        ))}
      </div>
      <span className="font-label text-label-sm text-charcoal-muted">
        {rating.toFixed(1)}{count !== undefined && ` (${count})`}
      </span>
    </div>
  );
}
