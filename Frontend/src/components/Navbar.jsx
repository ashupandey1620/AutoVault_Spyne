import { Car } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full my-auto items-center mx-auto px-4 sm:px-6 lg:px-8 bg-gray-200">
      <div className="flex items-center justify-between h-[5rem]">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl flex items-center gap-5 font-extrabold  tracking-tight  transition duration-300"
          >
            <Car size={32} />
            AutoVault
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link
              to="/listing"
              className=" border hover:border-gray-600 border-transparent hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Listing
            </Link>
            <Link
              to="/add-car"
              className=" border hover:border-gray-600 border-transparent hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Add Car
            </Link>
            <Link
              to="/support"
              className=" border hover:border-gray-600 border-transparent hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Support
            </Link>
            <Link
              to="/contact"
              className=" border hover:border-gray-600 border-transparent hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <button
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              navigate("/")
            }}
            className=" border hover:border-gray-600 border-transparent hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition duration-300 bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
        <div className="-mr-2 flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md  border hover:border-gray-600 border-transparent hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
    //   {isMenuOpen && (
    //     <div className="md:hidden" id="mobile-menu">
    //       <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white bg-opacity-10 backdrop-blur-md">
    //         <Link
    //           to="/listing"
    //           className=" border hover:border-gray-600 border-transparent hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
    //         >
    //           Listing
    //         </Link>
    //         <Link
    //           to="/add-car"
    //           className=" border hover:border-gray-600 border-transparent hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
    //         >
    //           Add Car
    //         </Link>
    //         <Link
    //           to="/support"
    //           className=" border hover:border-gray-600 border-transparent hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
    //         >
    //           Support
    //         </Link>
    //         <Link
    //           to="/contact"
    //           className=" border hover:border-gray-600 border-transparent hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
    //         >
    //           Contact
    //         </Link>
    //         <button
    //           onClick={() => {
    //             /* Add logout functionality */
    //           }}
    //           className=" border hover:border-gray-600 border-transparent hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300"
    //         >
    //           Logout
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </nav>
  );
}
