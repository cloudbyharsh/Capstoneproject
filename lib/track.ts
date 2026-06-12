/**
 * Shared Heap Analytics tracking utility.
 * Safe to call on SSR — guards against window being undefined.
 * Import this in any client component instead of accessing window.heap directly.
 */

export function track(
  event: string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  const h = (window as any).heap;
  if (h?.track) h.track(event, props);
}

export function identify(userId: string) {
  if (typeof window === "undefined") return;
  const h = (window as any).heap;
  if (h?.identify) h.identify(userId);
}

export function addUserProperties(
  props: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  const h = (window as any).heap;
  if (h?.addUserProperties) h.addUserProperties(props);
}
