import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  async function apiSignUp(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      if (data.statusMsg === "success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        setOtpSent(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
    setLoading(false);
  }

  async function otpSubmit(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      if (data.status === "Success") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/resertPassword', { state: { email: formik.values.email }});
        console.log( formik.values.email);
        
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
    setLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: apiSignUp,
    validate: (values) => {
      const errors = {};
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regexEmail.test(values.email)) {
        errors.email = "Invalid Email";
      }
      return errors;
    },
  });

  const formikOtp = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: otpSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.resetCode) {
        errors.resetCode = "OTP is required";
      }
      return errors;
    },
  });

  return (
    <>
      {!otpSent ? (
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-10">
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
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
            >
              Email address
            </label>
            {formik.errors.email && formik.touched.email && (
              <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                {formik.errors.email}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
          >
            {loading ? <ColorRing visible={true} height="40" width="40" colors={["#fff", "#fff", "#fff", "#fff", "#fff"]} /> : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={formikOtp.handleSubmit} className="max-w-md mx-auto my-10">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="resetCode"
              id="resetCode"
              value={formikOtp.values.resetCode}
              onChange={formikOtp.handleChange}
              onBlur={formikOtp.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="resetCode"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600"
            >
              Verify OTP
            </label>
            {formikOtp.errors.resetCode && formikOtp.touched.resetCode && (
              <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                {formikOtp.errors.resetCode}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={!formikOtp.dirty || !formikOtp.isValid}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
          >
            {loading ? <ColorRing visible={true} height="40" width="40" colors={["#fff", "#fff", "#fff", "#fff", "#fff"]} /> : "Verify OTP"}
          </button>
        </form>
      )}
    </>
  );
}
