import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCreation from "./ProductCreation";
import Wrapper from "../wrapper/page";
import { Navbar } from "./Navbar";

const mock_cars = [
  {
    id: "1",
    title: "Toyota Camry",
    description:
      "A reliable sedan with excellent fuel efficiency and a smooth ride.",
    images: ["/test_car.png", "/test_car2.png"],
    tags: { carType: "Sedan", company: "Toyota", dealer: "City Car Dealers" },
    ownerId: "user001",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    title: "Ford Mustang",
    description:
      "A classic American muscle car with impressive power and design.",
    images: ["/test_car.png", "/test_car2.png"],
    tags: { carType: "Coupe", company: "Ford", dealer: "AutoNation" },
    ownerId: "user002",
    createdAt: "2024-02-10",
    updatedAt: "2024-02-12",
  },
  {
    id: "3",
    title: "Honda Civic",
    description:
      "An affordable, compact car with great fuel economy and reliability.",
    images: ["/test_car.png", "/test_car2.png"],
    tags: { carType: "Sedan", company: "Honda", dealer: "Best Cars" },
    ownerId: "user003",
    createdAt: "2024-03-05",
    updatedAt: "2024-03-10",
  },
  {
    id: "4",
    title: "Tesla Model S",
    description:
      "A high-performance electric car with cutting-edge technology.",
    images: ["/test_car.png", "/test_car2.png"],
    tags: { carType: "Electric", company: "Tesla", dealer: "Tesla Dealership" },
    ownerId: "user004",
    createdAt: "2024-04-22",
    updatedAt: "2024-04-25",
  },
  {
    id: "5",
    title: "Chevrolet Silverado",
    description: "A durable and versatile pickup truck with plenty of power.",
    images: ["/test_car.png", "/test_car2.png"],
    tags: { carType: "Truck", company: "Chevrolet", dealer: "Trucks R Us" },
    ownerId: "user005",
    createdAt: "2024-05-01",
    updatedAt: "2024-05-03",
  },
  {
    id: "6",
    title: "BMW 3 Series",
    description:
      "A luxury sedan offering a blend of comfort, performance, and style.",
    images: ["/test_car.png", "/test_car2.png"],
    tags: { carType: "Sedan", company: "BMW", dealer: "Luxury Autos" },
    ownerId: "user006",
    createdAt: "2024-06-18",
    updatedAt: "2024-06-20",
  },
  {
    id: "7",
    title: "Audi Q7",
    description:
      "A spacious and elegant SUV, perfect for family trips and adventures.",
    images: ["/test_car.png", "/test_car2.png"],
    tags: { carType: "SUV", company: "Audi", dealer: "Audi Center" },
    ownerId: "user007",
    createdAt: "2024-07-10",
    updatedAt: "2024-07-12",
  },
  {
    id: "8",
    title: "Mercedes-Benz C-Class",
    description:
      "A sophisticated luxury sedan with advanced features and smooth handling.",
    images: ["/test_car.png", "/test_car2.png"],
    tags: {
      carType: "Sedan",
      company: "Mercedes-Benz",
      dealer: "Premium Motors",
    },
    ownerId: "user008",
    createdAt: "2024-08-01",
    updatedAt: "2024-08-03",
  },
  {
    id: "9",
    title: "Nissan Altima",
    description:
      "A comfortable and reliable mid-size sedan with great mileage.",
    images: ["/test_car.png", "/test_car2.png"],
    tags: { carType: "Sedan", company: "Nissan", dealer: "Value Autos" },
    ownerId: "user009",
    createdAt: "2024-09-15",
    updatedAt: "2024-09-17",
  },
  {
    id: "10",
    title: "Jeep Wrangler",
    description:
      "A rugged SUV, ideal for off-road adventures and exploring the outdoors.",
    images: ["/test_car.png", "/test_car2.png"],
    tags: { carType: "SUV", company: "Jeep", dealer: "Adventure Autos" },
    ownerId: "user010",
    createdAt: "2024-10-05",
    updatedAt: "2024-10-07",
  },
];

export default function ProductList() {
  const navigate = useNavigate();
  const [cars, setCars] = useState(mock_cars);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter(
      (car) =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(car.tags).some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredCars(filtered);
  }, [searchTerm, cars]);

  const fetchCars = async () => {
    try {
      const response = await fetch("/api/listProducts");
      if (response.ok) {
        const data = await response.json();
        setCars(data);
      } else {
        console.error("Failed to fetch cars");
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <h1 className="text-4xl flex font-bold mb-8 text-gray-800 text-center">
          Your Cars
        </h1>
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div
          onClick={() => {
            setAddModalOpen(true);
          }}
          className="fixed cursor-pointer bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-110"
          aria-label="Add New Car"
        >
          <Plus className="w-6 h-6" />
        </div>
      </div>
      {addModalOpen && <ProductCreation setAddModalOpen={setAddModalOpen} />}
    </div>
  );
}

function CarCard({ car }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:shadow-xl">
      <Link to={`/products/${car.id}`}>
        <div className="relative h-64 overflow-hidden group">
          <img
            src={car.images[currentImageIndex]}
            alt={`${car.title} - img ${currentImageIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="transform transition duration-300 ease-in-out hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition duration-300 ease-in-out" />

          {car.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </>
          )}
        </div>
      </Link>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out">
          <Link href={`/products/${car.id}`}>{car.title}</Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{car.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(car.tags).map(([key, value], index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              {value}
            </span>
          ))}
        </div>
        {car.images.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto p-2">
            {car.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${
                  index === currentImageIndex ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`${car.title} - Thumbnail ${index + 1}`}
                  // width={64}
                  // height={64}
                  objectFit=""
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
