import { useRouter } from "next/router";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { PropertyProps } from "@/interfaces";
import PropertyDetail from "@/components/property/PropertyDetail";
import BookingSection from "@/components/property/BookingSection";
import ReviewSection from "@/components/property/ReviewSection";

const PropertyPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Avoid rendering before query param is available
  if (!router.isReady) return null;

  // Convert id to number and find the property
  const matchedProperty = PROPERTYLISTINGSAMPLE.find(
    (p) => p.id === Number(id)
  );

  // If not found, show a message
  if (!matchedProperty) {
    return <div className="p-6 text-xl">Property not found</div>;
  }

  // Provide default values to avoid crashing
  const property: PropertyProps = {
    ...matchedProperty,
    category: matchedProperty.category || [],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Banner Image */}
      <div className="rounded-xl overflow-hidden shadow">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-80 md:h-[400px] object-cover"
        />
      </div>

      {/* Main Grid */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Column */}
        <div className="flex-1 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <PropertyDetail property={property} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
           <ReviewSection reviews={property.reviews || []} />
          </div>
        </div>

        {/* Right Column (Booking) */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow sticky top-24">
            <BookingSection
              price={property.price}
              discount={property.discount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
