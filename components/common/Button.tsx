import React from 'react';

interface ButtonProps {
  adults: number;
  childrenCount: number;
}

export default function Button({ adults, childrenCount }: ButtonProps) {
  const handleClick = () => {
    // Example logic: log or submit the values
    console.log(`Booking for ${adults} adults and ${childrenCount} children`);
    // You can now use these values to send to an API or update state
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
    >
      Check Availability
    </button>
  );
}
