import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo2.webp";
import { authtoken } from "../../Context/Authtoken";
import { CartContext } from "../../Context/CartContextProvider";

export default function Navbarheader() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, settoken } = useContext(authtoken);
  const { numOfCartItems } = useContext(CartContext);

  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("tkn");
    settoken(null);
    navigate("/login");
  }

  return (
    <nav className=" bg-[#F3F3E0] shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
            <h2 className="text-lg font-bold text-gray-800">Online Shopping</h2>
          </div>

          {/* Menu Icon (Mobile) */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
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
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:space-x-6">
            {token ? (
              <>
                <NavLink
                  to="/product"
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/Categories"
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Categories
                </NavLink>
                <NavLink
                  to="/brands"
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Brands
                </NavLink>
                <NavLink
                  to="/cart"
                  className="relative text-gray-800 hover:text-black-600 px-3 py-2 text-sm font-medium "
                >
                  Cart
                  <div className="absolute -top-3 -right-3 px-2.5 py-0.5 bg-blue-500 rounded-full text-xs">
                    {numOfCartItems}
                  </div>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>

          {/* Logout / Login-Register Button */}
          <div className="hidden sm:flex sm:items-center">
            {token ? (
              <span
                onClick={Logout}
                className="cursor-pointer text-gray-800 hover:text-red-600 px-3 py-2 text-sm font-medium"
              >
                Logout
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {token ? (
              <>
                <NavLink
                  to="/product"
                  className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/Categories"
                  className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Categories
                </NavLink>
                <NavLink
                  to="/brands"
                  className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Brands
                </NavLink>
                <NavLink
                  to="/cart"
                  className="relative  text-gray-800 my-3  text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Cart
                  <div className="absolute  bottom-4 left-10 px-2.5 py-0.5 bg-blue-500 rounded-full text-xs ">
                    {numOfCartItems}
                  </div>
                </NavLink>
                <span
                  onClick={Logout}
                  className="block text-gray-800 hover:text-red-600 cursor-pointer px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
