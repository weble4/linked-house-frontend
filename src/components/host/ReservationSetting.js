import React, { useEffect, useState } from "react";
import axios from "axios";
import ReservationItem from "./ReservationItem";

const ReservationSetting = () => {
  const [houses, setHouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://110.165.18.244:8080/api/host/houses?page=${currentPage}&size=10`, // Fetch 10 records per page
            { headers }
          );
          setHouses(response.data.content);
          setTotalPages(response.data.totalPages);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }
  }, [currentPage]);

  if (!houses) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

  return (
    <div className="house-management p-8">
      <h1 className="text-3xl font-semibold mb-6">House Management</h1>
      <div className="p-6">
        <div className="grid">
          {houses.map((house) => (
            <ReservationItem key={house.rentalId} house={house} />
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-3 py-2 rounded ${
              currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReservationSetting ;