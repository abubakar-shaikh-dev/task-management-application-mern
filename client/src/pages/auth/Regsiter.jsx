import React from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";

//Validation
import { RegisterSchema } from "../../validations/auth/Register.validation.jsx";

//Api
import * as AuthApi from "../../services/auth/api.auth";


export default function Register() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema()),
  })


  const onSubmit = (data) => {const response = AuthApi.RegisterUser(data);
    toast.promise(
      response,
      {
        loading: "Please wait...",
        success: (data) => data.msg,
        error: (err) => err.msg,
      },
      {
        success: {
          duration: 2000,
        },
        error: {
          duration: 1000,
        },
      }
    );

    response
      .then((data) => {
        const token = data.token;
        const refreshToken = data.refreshToken;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        //isLoggedIn => TRUE
        dispatch(authActions.login());
        
        //NAVIGATE AFTER PERFORMING TASKS
        navigate("/authorpanel/dashboard");
      })
      .catch((err) => err);
  }

  return (
    <section className="flex font-poppins justify-center items-center h-screen w-full">
      <div className="flex flex-col max-w-md p-6 shadow-2xl rounded-md sm:p-10 bg-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl text-black font-bold">Create Account</h1>
          <p className="text-sm text-gray-400">Regsiter to manage your Tasks</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
          <div className="space-y-4">
          <div>
              <label htmlFor="name" className="block mb-2 text-sm text-black">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                id="name"
                placeholder="Jon Doe"
                autoComplete="off"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-800 focus:ring-black"
              />
              {errors.name && (
              <p className="text-sm mt-2 ml-1 text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-black">
                Email address
              </label>
              <input
                type="email"
                {...register("email")}
                id="email"
                placeholder="email@domain.com"
                autoComplete="off"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-800 focus:ring-black"
              />
              {errors.email && (
              <p className="text-sm mt-2 ml-1 text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm text-black">
                  Password
                </label>
              </div>
              <input
                type="password"
                {...register("password")}
                id="password"
                placeholder="**********"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-white text-gray-800 focus:ring-black"
              />
              {errors.password && (
              <p className="text-sm mt-2 ml-1 text-red-600">{errors.password.message}</p>
              )}
            </div>

          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full mb-3 px-8 py-3 rounded tracking-wider bg-black text-white"
              >
                Register Now
              </button>
            </div>
            <p className="px-6 text-sm text-center text-gray-500">
              Already have an account?
              <Link
                rel="noopener noreferrer"
                to="/"
                className="hover:underline text-black"
              >
                {" "}
                Login
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
