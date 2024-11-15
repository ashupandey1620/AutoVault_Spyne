import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mock_cars } from "../data/cars";
import {
  Edit,
  Trash2,
  X,
  Plus,
  XCircle,
  Save,
  ChevronLeft,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { BASE_URL } from "../data";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const [car, setCar] = useState({
    id: "",
    title: "",
    description: "",
    images: [],
    tags: {},
    ownerId: "",
    createdAt: "",
    updatedAt: "",
    newImage: "",
    isEditing: false,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(id)
  }, [id]);

  const fetchData = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", localStorage.getItem("access_token"));

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/auth/getCar/${id}`,
        requestOptions
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCar(data.car);
      } else {
        console.error("Failed to fetch cars");
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    console.log("Car:", car);
  }, [car]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedCar = {
        ...car,
      };
      console.log("Updated car:", updatedCar);
      setCar(updatedCar);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleDelete = async () => {
      const myHeaders = new Headers();
      myHeaders.append(
        "authorization",
        localStorage.getItem("access_token")
      );
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      try {
        const response = await fetch(
          `${BASE_URL}/api/auth/deleteCar/${car._id}`,
          requestOptions
        );
        const result = await response.text();
        if(response.status==200){
          toast.success("Car deleted successfully");
        }
        navigate("/products");
      } catch (error) {
        console.error("Error deleting car:", error);
      }
  };
  

  const handleAddImage = () => {
    if (car.newImage && !car.images.includes(car.newImage)) {
      setCar((prevState) => ({
        ...prevState,
        images: [...prevState.images, car.newImage],
        newImage: "",
      }));
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = car.images.filter((_, i) => i !== index);
    setCar((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="min-h-screen bg-white text-gray-900 p-8">
        <div className="mx-auto">
          {car.isEditing ? (
            <div className="">
              <h1 className="text-4xl flex items-center gap-4 font-bold mb-6 text-gray-900">
                <div
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full cursor-pointer"
                  onClick={() => setCar({ ...car, isEditing: false })}
                >
                  <ChevronLeft className="w-8 h-8" />
                </div>
                Edit Car
              </h1>
              <form onSubmit={handleUpdate} className="space-y-8 p-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Basic Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={car.title}
                        onChange={(e) =>
                          setCar({ ...car, title: e.target.value })
                        }
                        required
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        placeholder="Enter car title"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={car.description}
                        onChange={(e) =>
                          setCar({ ...car, description: e.target.value })
                        }
                        required
                        rows={4}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        placeholder="Describe the car"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Additional Details
                  </h2>
                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tags
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        id="tags"
                        value={Object.entries(car.tags)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(", ")}
                        onChange={(e) => {
                          const newTags = e.target.value
                            .split(",")
                            .reduce((acc, tag) => {
                              const [key, value] = tag
                                .split(":")
                                .map((item) => item.trim());
                              if (key && value) acc[key] = value;
                              return acc;
                            }, {});
                          setCar({ ...car, tags: newTags });
                        }}
                        required
                        className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        placeholder="Enter comma-separated tags"
                      />
                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Comma-separated
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Image Gallery
                  </h2>
                  <div className="space-y-4">
                    {car.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-white p-3 rounded-md shadow"
                      >
                        <img
                          src={image}
                          alt={`Car image ${index + 1}`}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <input
                          type="text"
                          value={image}
                          onChange={(e) => {
                            const updatedImages = [...car.images];
                            updatedImages[index] = e.target.value;
                            setCar({ ...car, images: updatedImages });
                          }}
                          className="flex-grow px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                          aria-label="Remove image"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={car.newImage}
                        onChange={(e) =>
                          setCar({ ...car, newImage: e.target.value })
                        }
                        placeholder="Enter image URL"
                        className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                        aria-label="Add image"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setCar({ ...car, isEditing: false })}
                    className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h1 className="text-4xl flex items-center gap-4 font-bold mb-6 text-gray-900">
                <div
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  <ChevronLeft className="w-8 h-8" />
                </div>
                {car.title}
              </h1>
              <div className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {car.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group overflow-hidden rounded-lg"
                    >
                      <img
                        src={image}
                        alt={`Car ${index + 1}`}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          View Image
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-gray-800 mb-6 leading-relaxed">
                {car.description}
              </p>
              <div className="mb-8">
                {Object.entries(car.tags).map(([key, value], index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {`${key}: ${value}`}
                  </span>
                ))}
              </div>
              <div className="mb-8 text-sm text-gray-600 space-y-1">
                <p>Owner: {car.ownerId}</p>
                <p>
                  Created at: {new Date(car.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Last updated: {new Date(car.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setCar({ ...car, isEditing: true })}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
