'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import LoginModal from '@/components/common/LoginModal';
import SignupModal from '@/components/common/SignupModal';
import ImageCarousel from '@/components/common/ImageCarousel';
import Pill from '@/components/common/Pill';
import { PROPERTYLISTINGSAMPLE } from '@/constants';

type FilterLabel = {
  label: string;
  value: string;
};

const filterLabels: FilterLabel[] = [
  { label: 'Free Wi-Fi', value: 'wifi' },
  { label: 'Breakfast Included', value: 'breakfast' },
  { label: 'Pool', value: 'pool' },
  { label: 'Parking', value: 'parking' },
  { label: 'Pet Friendly', value: 'pets' },
  { label: 'Gym', value: 'gym' },
];

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  console.log('PROPERTYLISTINGSAMPLE:', PROPERTYLISTINGSAMPLE);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function HeroSection() {
    return (
      <div
        style={{
          backgroundImage: "url('/ng')",
          height: '400px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 20px',
          color: 'black',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
          Find your favorite place here!
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1rem' }}>
          The best prices for over 2 million properties worldwide.
        </p>
      </div>
    );
  }

  return (
    <>
      <main className="relative">
        <HeroSection />
        
      
        <div className="my-8 px-8">
          <ImageCarousel />
        </div>
        <section id="home" className="py-16 px-8 bg-gray-50"> </section>
        {showSignup && (
          <SignupModal
            onClose={() => setShowSignup(false)}
            onSwitch={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        )}

        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onSwitch={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        )}

        <section className="flex justify-center relative z-10 -mt-[150px]">
          <form className="flex flex-col gap-6 items-center bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Check For Availability
            </h2>
            <div className="flex gap-8 w-full justify-center flex-wrap">
              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1" htmlFor="checkin">
                  Check-in
                </label>
                <input
                  id="checkin"
                  type="date"
                  className="w-48 p-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg font-semibold mb-1" htmlFor="checkout">
                  Check-out
                </label>
                <input
                  id="checkout"
                  type="date"
                  className="w-48 p-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="adults" className="text-lg font-semibold mb-1">
                  Adults
                </label>
                <input
                  id="adults"
                  type="number"
                  min={1}
                  max={9}
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-32 p-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="children" className="text-lg font-semibold mb-1">
                  Children
                </label>
                <input
                  id="children"
                  type="number"
                  min={0}
                  max={9}
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-32 p-2 border rounded"
                />
              </div>
            </div>
            <div className="mt-6 w-full flex justify-center">
              <Button adults={adults} childrenCount={children} />
            </div>
          </form>
        </section>

        <section className="py-12 px-8 bg-white">
          <h3 className="text-2xl font-bold text-center mb-6">Filter by Amenities</h3>
          <Pill
            filters={filterLabels}
            selectedValue={selectedFilter}
            onClick={(filter) => setSelectedFilter(filter.value)}
          />
        </section>




<section id="properties" className="py-16 px-8 bg-white">
  <h2 className="text-4xl font-bold text-center mb-12">Rooms</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {PROPERTYLISTINGSAMPLE
      .filter((property) => {
        if (!selectedFilter) return true;
        return property.amenities?.includes(selectedFilter);
      })
      .map((property, index) => (
        <div
          key={property.id ?? index}
          className="bg-gray-100 rounded-lg shadow-md overflow-hidden"
        >
          <Image
            src={property.image ?? '/assets/rooms/room-1.jpg'}
            alt={property.name}
            width={400}
            height={250}
            className="object-cover w-full h-48"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
            <p className="text-gray-600 mb-1">
              {property.address.city}, {property.address.state}, {property.address.country}
            </p>
            <p className="text-gray-700 mb-2">Rating: {property.rating}</p>
            <p className="text-gray-700 mb-2">{property.category.join(', ')}</p>
            <p className="text-gray-900 font-bold mb-2">
              ${property.price.toLocaleString()}
            </p>
            <div className="flex gap-4 text-sm text-gray-600 mb-3">
              <span>{property.offers.bed}</span>
              <span>{property.offers.shower}</span>
              <span>{property.offers.occupants} guests</span>
            </div>
            {property.discount && (
              <p className="text-green-600 font-semibold">
                Discount: {property.discount}% off
              </p>
            )}
            <Button adults={adults} childrenCount={children} />
          </div>
        </div>
      ))}
  </div>
</section>

        <section id="about" className="py-16 px-8 bg-gray-50">
          <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
          <div className="max-w-4xl mx-auto text-center font-semibold space-y-6">
            <p>
              Welcome to ALX Luxury Stay, where comfort meets elegance and every
              guest is treated like royalty.
            </p>
            <p>
              Nestled in the heart of the city, our hotel offers a serene escape
              from the hustle of everyday life.
            </p>
            <p>
              From our carefully designed rooms to our very attentive staff, every
              detail is crafted to make your stay unforgettable.
            </p>
            <p>
              Whether you are a business traveler, a family on vacation, or a couple
              seeking a romantic getaway, our rooms cater to every need and style.
            </p>
            <p>
              We take pride in cleanliness, sustainability, and satisfaction—free
              Wi-Fi, air conditioning, and 24/7 support are standard.
            </p>
            <p>Experience the warmth and tranquility of ALX Luxury Stay—your home away from home.</p>
          </div>
        </section>
      </main>
    </>
  );
}
