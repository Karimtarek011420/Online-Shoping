import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContextProvider";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const { apiCart, message } = useContext(CartContext);
  async function handelApiContext(id) {
    const Messasge = await apiCart(id);
    if (Messasge) {
      console.log("good");
      toast.success(message, {
        duration: 2000,
        position: "top-right",
        style: { backgroundColor: "#2563eb", color: "white" },
      });
    } else {
      toast.error("some thing is error", {
        duration: 2000,
        position: "top-right",
      });
    }
  }

  function fetchProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { isError, data, isLoading, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: fetchProductDetails,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const product = data.data.data;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Product Image Slider */}
        <div className=" w-96 ">
          {product.images.length > 1 ? (
            <Slider {...sliderSettings}>
              {product.images?.map((image, index) => (
                <div key={index} className="p-4">
                  <img
                    src={image}
                    alt="Product"
                    className="w-full rounded-lg shadow-lg transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="p-4">
              <img
                src={product.images[0]}
                alt="Product"
                className="w-full rounded-lg shadow-lg transition-transform hover:scale-105"
              />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            {product.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="text-lg font-bold">
            <span
              className={
                product.priceAfterDiscount
                  ? "line-through text-red-500"
                  : "text-gray-800"
              }
            >
              ${product.price}
            </span>
            {product.priceAfterDiscount && (
              <span className="ml-3 text-gray-900 text-2xl">
                ${product.priceAfterDiscount}
              </span>
            )}
          </div>

          <div className="flex items-center mt-3 mb-5">
            {[1, 2, 3, 4, 5].map((rate, i) => (
              <svg
                key={i}
                className={
                  product.ratingsAverage >= rate
                    ? "w-5 h-5 text-yellow-400"
                    : "w-5 h-5 text-gray-300"
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded">
              {product.ratingsAverage}
            </span>
          </div>

          {/* Add to Cart Button */}
          <div
            onClick={() => {
              handelApiContext(product._id);
            }}
          >
            <Link className=" w-full inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-200 w-full md:w-auto text-center">
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
