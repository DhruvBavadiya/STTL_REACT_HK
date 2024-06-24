import React from 'react';
import { Link } from 'react-router-dom';

type PromotionCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  id:string
};

const PromotionCard: React.FC<PromotionCardProps> = ({ imageUrl, title, description,id }) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={title}
        className="h-64 sm:h-80 w-full object-cover transform hover:scale-105 transition-transform duration-300"
      />
      <div className="p-6 bg-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        {/* Replace anchor tag with Link component */}
        <Link
          to={`/products/${id}`}// Adjust the 'to' prop to the desired route
          className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default PromotionCard;
