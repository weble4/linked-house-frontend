import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const HouseUpdateForm = () => {
  const navigate = useNavigate();
  const { rentalId } = useParams();
  // houseData는 초기 데이터로 설정되지만 수정할 때 사용하지 않습니다.
  // eslint-disable-next-line no-unused-vars
  const [houseData, setHouseData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [imageFiles, setImageFiles] = useState([]);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(`http://localhost:8080/api/houses/${rentalId}`, axiosConfig)
      .then((response) => {
        setHouseData(response.data);
        setEditedData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching house data:", error);
      });
  }, [accessToken, rentalId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = e.target.files;
    console.log(selectedFiles);
    setImageFiles([...selectedFiles]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateToSend = new FormData();

    updateToSend.append(
      "update",
      new Blob([JSON.stringify(editedData)], { type: "application/json" })
    );

    for (let i = 0; i < imageFiles.length; i++) {
      updateToSend.append("images", imageFiles[i]);
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.patch(
        `http://localhost:8080/api/host/houses/${rentalId}`,
        updateToSend,
        config
      );
      window.alert("수정 완료 되었습니다.");
      navigate("/house-management");
    } catch (error) {
      const responseMessage = error.response.data;
      console.log(responseMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg mt-5">
      <h2 className="text-2xl font-semibold mb-4">하우스 수정 페이지</h2>
      <div className="mb-4">
        <label className="block text-gray-700">하우스 설명</label>
        <input
          type="text"
          name="description"
          value={editedData.description || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">지역</label>
        <input
          type="text"
          name="location"
          value={editedData.location || ""}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
          disabled
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">인당 가격</label>
        <input
          type="number"
          name="price"
          value={editedData.price || 0}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">최대 인원</label>
        <input
          type="number"
          name="maxCapacity"
          value={editedData.maxCapacity || 0}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">최소 인원</label>
        <input
          type="number"
          name="minCapacity"
          value={editedData.minCapacity || 0}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">방 개수</label>
        <input
          type="number"
          name="room"
          value={editedData.room || 0}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">침대 개수</label>
        <input
          type="number"
          name="bed"
          value={editedData.bed || 0}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">화장실</label>
        <input
          type="number"
          name="bathRoom"
          value={editedData.bathRoom || 0}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4 text-red-500">
        <p>기존의 이미지는 모두 삭제됩니다. 새로운 이미지를 올려 주세요.</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image:</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFileInputChange}
          className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      {imageFiles.length > 0 && (
        <div className="mb-4">
          <label className="block text-gray-700">Selected Images:</label>
          <ul>
            {imageFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        업데이트
      </button>
    </div>
  );
};

export default HouseUpdateForm;
