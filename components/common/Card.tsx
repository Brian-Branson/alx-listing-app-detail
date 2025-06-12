// components/common/Card.tsx
import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

export default Card;
