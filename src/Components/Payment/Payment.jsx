import { useContext, useState } from "react";
import logo from "../../assets/images/logo.jpg";
import { CartContext } from "../../Context/CartContextProvider";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { cartId ,cartPayment} = useContext(CartContext);
  const [isoline, setisoline] = useState(false);
  const paymentNavigate = useNavigate();

function choosePayment(values) {
  if (isoline) {
    apiOnlinePayment(values)
  }else{
    apiCashPayment(values)
  }
    
  }
  async function apiCashPayment(values) {
    const shippingAddresspayment = {
      shippingAddress: {
        values,
      },
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddresspayment,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((x) => {
        if (x.data.status == "success") {
          toast.success("Payment Successful", {
            duration: 2000,
            position: "top-right",
            style: { backgroundColor: "#2563eb", color: "white" },
          });
          cartPayment()
          setTimeout(() => {
            paymentNavigate("/product");
          }, 2000);
        }
      })
      .catch((x) => {
        console.log("kkkk", x);
      });
  }
  async function apiOnlinePayment(values) {
    const shippingAddresspayment = {
      shippingAddress: {
        values,
      },
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddresspayment,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
          params: {
            url: "http://localhost:5173",
          },
        }
      )
      .then((x) => {
        console.log("ll", x.data.session.url);
        if (x.data.status == "success") {
          window.open(x.data.session.url );

          setTimeout(() => {
            toast.success("Payment Successful", {
              duration: 2000,
              position: "top-right",
              style: { backgroundColor: "#2563eb", color: "white" },
            });
          }, 500);
        }
      })
      .catch((x) => {
        console.log("kkkk", x);
      });
  }
  const PaymentFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: choosePayment,
  });
  return (
    <>
      <div className=" py-10">
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n/*remove custom style*/\n  .circles{\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n}\n  .circles li{\n    position: absolute;\n    display: block;\n    list-style: none;\n    width: 20px;\n    height: 20px;\n    background: rgba(255, 255, 255, 0.2);\n    animation: animate 25s linear infinite;\n    bottom: -150px;  \n}\n.circles li:nth-child(1){\n    left: 25%;\n    width: 80px;\n    height: 80px;\n    animation-delay: 0s;\n}\n \n \n.circles li:nth-child(2){\n    left: 10%;\n    width: 20px;\n    height: 20px;\n    animation-delay: 2s;\n    animation-duration: 12s;\n}\n \n.circles li:nth-child(3){\n    left: 70%;\n    width: 20px;\n    height: 20px;\n    animation-delay: 4s;\n}\n \n.circles li:nth-child(4){\n    left: 40%;\n    width: 60px;\n    height: 60px;\n    animation-delay: 0s;\n    animation-duration: 18s;\n}\n \n.circles li:nth-child(5){\n    left: 65%;\n    width: 20px;\n    height: 20px;\n    animation-delay: 0s;\n}\n \n.circles li:nth-child(6){\n    left: 75%;\n    width: 110px;\n    height: 110px;\n    animation-delay: 3s;\n}\n \n.circles li:nth-child(7){\n    left: 35%;\n    width: 150px;\n    height: 150px;\n    animation-delay: 7s;\n}\n \n.circles li:nth-child(8){\n    left: 50%;\n    width: 25px;\n    height: 25px;\n    animation-delay: 15s;\n    animation-duration: 45s;\n}\n \n.circles li:nth-child(9){\n    left: 20%;\n    width: 15px;\n    height: 15px;\n    animation-delay: 2s;\n    animation-duration: 35s;\n}\n \n.circles li:nth-child(10){\n    left: 85%;\n    width: 150px;\n    height: 150px;\n    animation-delay: 0s;\n    animation-duration: 11s;\n}\n  @keyframes animate {\n \n    0%{\n        transform: translateY(0) rotate(0deg);\n        opacity: 1;\n        border-radius: 0;\n    }\n \n    100%{\n        transform: translateY(-1000px) rotate(720deg);\n        opacity: 0;\n        border-radius: 50%;\n    }\n \n}\n.triangle{\n  border-top:60rem solid #fff;\n  border-left:25rem solid transparent;\n}\n",
          }}
        />
        <div className="relative min-h-screen flex ">
          <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
            <div
              className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
              }}
            >
              <div className="absolute bg-gradient-to-b from-blue-900 to-gray-900 opacity-75 inset-0 z-0" />
              <div
                className="absolute triangle  min-h-screen right-0 w-16"
                style={{}}
              />
              <a
                href="https://codepen.io/uidesignhub"
                target="_blank"
                title="codepen aji"
                className="flex absolute top-5 text-center text-gray-100 focus:outline-none"
              >
                <img
                  src={logo}
                  alt="aji"
                  className="object-cover mx-auto w-8 h-8 rounded-full w-10 h-10"
                />
                <p className="text-xl ml-3">
                  Online <strong>Shopping</strong>
                </p>{" "}
              </a>
              <img
                src="https://jasper-pimstorage-skullcandy.s3.us-west-1.amazonaws.com/bd2253a9671dac36a95faf821b52e78935050140be1718ce001f6aace45cf25c.png"
                className="h-96 absolute right-5 mr-5"
              />
              <div className="w-full  max-w-md z-10">
                <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                  Our website is designed to provide a seamless shopping
                  journey..
                </div>
                <div className="sm:text-lg xl:text-md text-gray-200  text ">
                  {" "}
                  What is Lorem Ipsum Lorem Ipsum is simply dummy Our website is
                  designed to provide a seamless shopping journey, from browsing
                  and wish-listing your favorite items to a secure checkout
                  experience. Explore exciting deals, exclusive discounts, and
                  enjoy fast shipping, so you can get the things you love
                  delivered straight to your door. Customer satisfaction is our
                  top priority, and our dedicated support team is here to ensure
                  you have a fantastic shopping experience with us
                </div>
              </div>
              <ul className="circles">
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
              </ul>
            </div>
            <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white ">
              <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                  <h2 className="mt-6 text-3xl font-bold text-gray-900">
                    Welcome to pay through our website
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Please sign in form
                  </p>
                </div>
                <form
                  onSubmit={PaymentFormik.handleSubmit}
                  className="mt-8 space-y-6"
                >
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="relative">
                    <label
                      htmlFor="details"
                      className="ml-3 text-lg font-bold text-gray-700 tracking-wide"
                    >
                      Details
                    </label>
                    <input
                      required
                      className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                      type="text"
                      name="details"
                      id="details"
                      value={PaymentFormik.values.details}
                      onChange={PaymentFormik.handleChange}
                    />
                  </div>
                  <div className="mt-8 content-center">
                    <label className="ml-3 text-lg font-bold  text-gray-700 tracking-wide">
                      Phone
                    </label>
                    <input
                      required
                      className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="tel"
                      name="phone"
                      value={PaymentFormik.values.phone}
                      onChange={PaymentFormik.handleChange}
                    />
                  </div>
                  <div className="mt-8 content-center">
                    <label className="ml-3 text-lg font-bold  text-gray-700 tracking-wide">
                      City
                    </label>
                    <input
                      required
                      className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="text"
                      name="city"
                      value={PaymentFormik.values.city}
                      onChange={PaymentFormik.handleChange}
                    />
                  </div>

                  <div className=" flex items-center justify-between">
                    <button
                    onClick={()=>{setisoline(false)}}
                      disabled={!PaymentFormik.dirty}
                      type="submit"
                      className="w-full mx-3 flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    >
                      Payment Cash
                    </button>
                    <button
                     onClick={()=>{setisoline(true)}}
                      type="submit"
                      className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                    >
                      Payment oline
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
