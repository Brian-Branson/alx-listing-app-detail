// components/FilterablePropertyList.tsx
import React, { useState } from "react";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { PropertyProps } from "@/interfaces";

const uniqueCategories = [
  "All",
  ...new Set(PROPERTYLISTINGSAMPLE.flatMap(p => p.category)),
];

const FilterablePropertyList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProperties: PropertyProps[] =
    selectedCategory === "All"
      ? PROPERTYLISTINGSAMPLE
      : PROPERTYLISTINGSAMPLE.filter(property =>
          property.category.includes(selectedCategory)
        );

  return (
    <div className="px-4">
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {uniqueCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm border ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtered Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="border rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{property.name}</h3>
              <p className="text-sm text-gray-600">
                {property.address.city}, {property.address.country}
              </p>
              <p className="mt-2 text-sm font-medium">${property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterablePropertyList;
