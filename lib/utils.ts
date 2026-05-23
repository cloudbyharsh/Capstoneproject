import servicesData from "./data/services.json";
import providersData from "./data/providers.json";
import { Service, Provider } from "./types";

export const services = servicesData as Service[];
export const providers = providersData as Provider[];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getProvider(id: string): Provider | undefined {
  return providers.find((p) => p.id === id);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter((s) => s.category.toLowerCase() === category.toLowerCase());
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}

export function getProviderServices(providerId: string): Service[] {
  return services.filter((s) => s.providerId === providerId);
}

export function formatPrice(price: number): string {
  return `$${price}`;
}

export const CATEGORIES = ["All", "Puja", "Astrology", "Vastu", "Meditation", "Havan"];
