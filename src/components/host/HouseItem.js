import React from "react";
import { Link } from "react-router-dom";

const HouseItem = ({ house }) => {
  const { rentalId, description, location, price, imagePath } = house;

  return (
    <div className="flex items-center hover:bg-gray-100 p-4 mb-4">
      {imagePath && (
        <div className="flex-shrink-0 w-24 h-24">
          <img
            src={imagePath[0]}
            alt={`House`}
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}
      <div className="ml-4">
        <h2 className="text-xl font-semibold">{description}</h2>
        <p className="text-gray-600">위치: {location}</p>
        <p className="text-gray-600">가격: {price}</p>
        <Link to={`/house-details/${rentalId}`} className="text-blue-500">
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            상세보기
          </button>
        </Link>

        <Link
          to={{ pathname: `/house-update/${rentalId}`}}
          className="text-green-500 ml-2"
        >
          <button className="bg-green-500 text-white px-3 py-1 rounded">
            수정
          </button>
        </Link>
      </div>
    </div>
  );
};
export default HouseItem;
