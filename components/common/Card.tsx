// pages/property/[id].tsx

import { useRouter } from 'next/router';
import { PROPERTYLISTINGSAMPLE } from '@/constants';
import { PropertyProps } from '@/interfaces';
import PropertyDetail from '@/components/property/PropertyDetail';
import BookingSection from '@/components/property/BookingSection';
import ReviewSection from '@/components/property/ReviewSection';

const PropertyPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const property: PropertyProps | undefined = PROPERTYLISTINGSAMPLE.find(
    (prop) => prop.id === Number(id)
  );

  if (!property) return <div className="p-6 text-xl">Property not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-2/3 w-full">
          <PropertyDetail property={property} />
          <div className="mt-8">
            <ReviewSection propertyId={property.id} />
          </div>
        </div>

        <div className="lg:w-1/3 w-full mt-8 lg:mt-0">
          <BookingSection price={property.price} discount={property.discount} />
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
