import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HouseRegist = () => {
  const navigate = useNavigate();

  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    description: null,
    maxCapacity: 0,
    minCapacity: 0,
    price: 0,
    location: "SEOUL",
    detailAddress: null,
    autoReservation: "AUTO",
    room: 0,
    bed: 0,
    bathRoom: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [imageSelected, setImageSelected] = useState(false); // Track if an image is selected
  const [imageFiles, setImageFiles] = useState([]);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setImageFiles(files);
      setImageSelected(true); // Set to true when an image is selected
    } else {
      setImageFiles([]);
      setImageSelected(false); // Set to false when no image is selected
    }

    // Generate image previews
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageSelected) {
      alert("Please select at least one image.");
      return;
    }

    const request = {
      description: formData.description,
      maxCapacity: parseInt(formData.maxCapacity),
      minCapacity: parseInt(formData.minCapacity),
      price: parseInt(formData.price),
      location: formData.location,
      detailAddress: formData.detailAddress,
      autoReservation: formData.autoReservation,
      room: parseInt(formData.room),
      bed: parseInt(formData.bed),
      bathRoom: parseInt(formData.bathRoom),
    };

    const formDataToSend = new FormData();

    // Append the 'request' data as JSON
    formDataToSend.append(
      "request",
      new Blob([JSON.stringify(request)], { type: "application/json" })
    );

    for (let i = 0; i < imageFiles.length; i++) {
      // Append each image file individually
      formDataToSend.append("images", imageFiles[i]);
    }

    const accessToken = localStorage.getItem("accessToken");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      await axios.post(
        "http://localhost:8080/api/host/houses",
        formDataToSend,
        config
      );
      navigate("/house-management");
    } catch (error) {
      const responseMessage = error.response.data.validation;
      if (responseMessage != null) {
        const validationMessages = [];

        for (const field in responseMessage) {
          if (responseMessage.hasOwnProperty(field)) {
            const message = responseMessage[field];
            validationMessages.push(`${field}: ${message}`);
          }
        }
        const formattedMessages = validationMessages.join("\n");
        window.alert(formattedMessages);
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">숙소 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="description"
                className="text-sm font-semibold block"
              >
                숙소 설명
              </label>
              <textarea
                className="border rounded-lg p-2 w-full"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="간단하게 숙소에대해 소개글을 적어주세요"
                rows="4"
              ></textarea>
            </div>

            <div>
              <label htmlFor="location" className="text-sm font-semibold block">
                지역
              </label>
              <select
                className="border rounded-lg p-2 w-full"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              >
                <option value="SEOUL">서울</option>
                <option value="SEJONG">세종</option>
                <option value="INCHENO">인천</option>
                <option value="DAEJEON">대전</option>
                <option value="GWANGJU">광주</option>
                <option value="BUSAN">부산</option>
                <option value="DEAGU">대구</option>
                <option value="ULSAN">울산</option>
                <option value="GYENGGIDO">경기도</option>
                <option value="GANGWONDO">강원도</option>
                <option value="CHUNGCHEONGDO">충청도</option>
                <option value="JEOLLADO">전라도</option>
                <option value="GYEONGSANGDO">경상도</option>
                <option value="JEJU">제주도</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label
                htmlFor="maxCapacity"
                className="text-sm font-semibold block"
              >
                최대 인원
              </label>
              <input
                type="number"
                className="border rounded-lg p-2 w-full"
                id="maxCapacity"
                name="maxCapacity"
                value={formData.maxCapacity}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="minCapacity"
                className="text-sm font-semibold block"
              >
                최소인원
              </label>
              <input
                type="number"
                className="border rounded-lg p-2 w-full"
                id="minCapacity"
                name="minCapacity"
                value={formData.minCapacity}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="price" className="text-sm font-semibold block">
                가격
              </label>
              <input
                type="number"
                className="border rounded-lg p-2 w-full"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="인당 가격"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label
                htmlFor="detailAddress"
                className="text-sm font-semibold block"
              >
                상세주소
              </label>
              <input
                type="text"
                className="border rounded-lg p-2 w-full"
                id="detailAddress"
                name="detailAddress"
                value={formData.detailAddress}
                onChange={handleInputChange}
                placeholder="Detail Address"
              />
            </div>
            <div>
              <label
                htmlFor="autoReservation"
                className="text-sm font-semibold block"
              >
                예약 수락 타입
              </label>
              <select
                className="border rounded-lg p-2 w-full"
                id="autoReservation"
                name="autoReservation"
                value={formData.autoReservation}
                onChange={handleInputChange}
              >
                <option value="AUTO">AUTO</option>
                <option value="MANUAL">MANUAL</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <label htmlFor="room" className="text-sm font-semibold block">
                Room
              </label>
              <input
                type="number"
                className="border rounded-lg p-2 w-full"
                id="room"
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                placeholder="Number of Rooms"
              />
            </div>
            <div>
              <label htmlFor="bed" className="text-sm font-semibold block">
                Bed
              </label>
              <input
                type="number"
                className="border rounded-lg p-2 w-full"
                id="bed"
                name="bed"
                value={formData.bed}
                onChange={handleInputChange}
                placeholder="Number of Beds"
              />
            </div>
            <div>
              <label htmlFor="bathRoom" className="text-sm font-semibold block">
                Bathrooms
              </label>
              <input
                type="number"
                className="border rounded-lg p-2 w-full"
                id="bathRoom"
                name="bathRoom"
                value={formData.bathRoom}
                onChange={handleInputChange}
                placeholder="Number of Bathrooms"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="images" className="text-sm font-semibold block">
              이미지
            </label>
            <input
              type="file"
              className="border rounded-lg p-2 w-full"
              id="images"
              name="images"
              multiple
              onChange={handleFileInputChange}
            />
          </div>
          {imageSelected ? null : (
            <div className="text-red-500 mt-2">
              Please select at least one image
            </div>
          )}

          <div className="mt-4">
            <label className="text-sm font-semibold block">미리보기</label>
            <div className="grid grid-cols-4">
              {imagePreviews.map((preview, index) => (
                <div key={index}>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-contain rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HouseRegist;
