import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Using react-icons for eye icons
import { authtoken } from "../../Context/Authtoken";
import { CartContext } from "../../Context/CartContextProvider";

export default function Login() {
  const [loading, setloading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {getUserCart}=useContext(CartContext)
  const { settoken } = useContext(authtoken);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const Navgite = useNavigate();
  async function apiSignUp(values) {
    setloading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );

      if (data.message === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "good",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(data.token);
        settoken(data.token);
        localStorage.setItem("tkn", data.token);
        getUserCart();
        setTimeout(function () {
          Navgite("/product");
        }, 1500);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
    setloading(false);
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: apiSignUp,
    validate: function (values) {
      let errors = {};
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

      if (!regexEmail.test(values.email)) {
        errors.email = "invalid Email";
      }

      if (!regexPassword.test(values.password)) {
        errors.password =
          "Password must be at least 8 characters long, contain uppercase letters, lowercase letters, and numbers.";
      }

      return errors;
    },
  });

  return (
    <>
    <div className="flex items-center justify-center  bg-gray-100  max-h-96 min-h-96">

      <form onSubmit={formik.handleSubmit} className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              style={{ paddingRight: "30px" }}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
  <button
    type="submit"
    disabled={!formik.dirty || !formik.isValid}
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    {loading ? (
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
      />
    ) : (
      "Login"
    )}
  </button>
  <div>
    <Link
      to="/Forgatpassword"
      className="text-blue-600 hover:text-blue-900"
    >
      Forgot your password?
    </Link>
  </div>
</div>

      </form>
    </div>
    </>
  );
}
