import React from 'react';
import { Link } from 'react-router-dom';

const HouseItem = ({ house }) => {
  const { rentalId, description, location, price, imagePath } = house;

  return (
    <div className="flex items-center hover:bg-gray-100 p-4 mb-4">
      <div className="flex-shrink-0 w-20 h-20">
        <image src={imagePath[0]} alt={`House Image`} className="w-full h-full object-cover rounded" />
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-semibold">{description}</h2>
        <p className="text-gray-600">위치: {location}</p>
        <p className="text-gray-600">가격: {price}</p>
        <Link to={`/house-details/${rentalId}`} className="text-blue-500">상세보기</Link>
      </div>
    </div>
  );
};

export default HouseItem;