export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

export interface Provider {
  id: string;
  name: string;
  photo: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  specialties: string[];
  bio: string;
  serviceIds: string[];
  location: string;
  yearsExperience: number;
  languages: string[];
  reviews: Review[];
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  providerId: string;
  image: string;
  tags: string[];
  includes: string[];
  featured: boolean;
}
