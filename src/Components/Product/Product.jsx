import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Categroy from "../Categroy/Categroy";
import { CartContext } from "../../Context/CartContextProvider";
import toast from "react-hot-toast";
export default function Product() {
  const [Allproducts, setAllproducts] = useState(null);
  const  {apiCart,message}= useContext(CartContext);
  async function handelApiContext(id) {
    const Messasge=  await apiCart(id);
    if (Messasge) {
      console.log("good");
      toast.success(message,{
        duration: 2000,
        position: "top-right",
        style:{backgroundColor:"#2563eb" , color:"white"}
      });
  
      
    }else {
      toast.error("some thing is error",{
        duration: 2000,
        position:"top-right"
      });
    }
    
   }

  async function ApiProducts() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setAllproducts(data.data);
  }
  useEffect(() => {
    ApiProducts();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {Allproducts ? (
        <div className="container mx-auto my-8 px-4">
          <div>
            <Categroy />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Allproducts?.map((Product) => {
              return (
                <div
                  key={Product._id}
                  className="bg-white shadow-md rounded-lg dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105"
                >
                  <div className=" relative group overflow-hidden">
                    <Link to={`/ProductDatils/${Product._id}`}>
                      {Product.images.length > 1 ? (
                        <Slider {...settings} arrows={false}>
                          {Product.images.map((image, index) => (
                            <img
                              key={index}
                              className="rounded-t-lg p-8 object-cover w-full"
                              src={image}
                              alt={Product.title}
                              loading=" lazy"
                            />
                          ))}
                        </Slider>
                      ) : (
                        <img
                          className="rounded-t-lg p-8 object-cover w-full h-50"
                          src={Product.images[0]}
                          alt={Product.title}
                        />
                      )}
                    </Link>
                    <div className=" absolute top-10 right-2 cursor-pointer translate-x-[200%]  group-hover:translate-x-[0%]  transition-all duration-75 ">
                      <i  onClick={()=>{handelApiContext(Product._id)}} className="fa-regular fa-heart   text-xl text-blue-500 "></i>
                    </div>
                  </div>

                  <div className="px-5 pb-5 mt-10">
                    <Link href="#">
                      <h3 className="text-gray-900 font-semibold text-lg sm:text-xl dark:text-white leading-tight">
                        {Product.title.split(" ").slice(0, 3).join(" ")}
                      </h3>
                    </Link>
                    <div className="flex items-center mt-2.5 mb-5">
                      {[1, 2, 3, 4, 5].map((rate, i) => (
                        <svg
                          key={i}
                          className={
                            Product.ratingsAverage >= rate
                              ? "w-5 h-5 text-yellow-300"
                              : "w-5 h-5 text-gray-300"
                          }
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        {Product.ratingsAverage}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className={
                            Product.priceAfterDiscount
                              ? " line-through text-2xl font-bold  text-red-700 dark:text-white"
                              : " text-2xl font-bold dark:text-white"
                          }
                        >
                          ${Product.price}
                        </span>
                        <span className=" mx-2 text-2xl font-bold text-gray-900 dark:text-white">
                          {Product.priceAfterDiscount}
                        </span>
                      </div>
                      <Link
                      onClick={()=>{handelApiContext(Product._id)}}
                        
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className=" h-screen bg-[#ffff]  flex justify-center items-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
    </>
  );
}
