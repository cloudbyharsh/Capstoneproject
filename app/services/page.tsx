import { services, providers } from "@/lib/utils";
import ServicesClient from "./ServicesClient";

export default function ServicesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const initialCategory = searchParams.category
    ? searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1)
    : "All";

  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-white border-b border-ivory-dark py-12">
        <div className="layout-container px-4 md:px-12 mx-auto max-w-layout">
          <h1 className="font-headline font-bold text-heading-lg text-charcoal mb-2">Browse Services</h1>
          <p className="font-body text-body-md text-charcoal-muted">
            Discover verified spiritual practitioners for every sacred occasion.
          </p>
        </div>
      </div>

      <div className="layout-container px-4 md:px-12 mx-auto max-w-layout py-10">
        <ServicesClient
          services={services}
          providers={providers}
          initialCategory={initialCategory}
        />
      </div>
    </div>
  );
}
