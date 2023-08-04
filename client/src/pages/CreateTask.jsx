import React,{useState} from "react";
import DefaltLayout from "../components/layouts/DefaultLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


//Validation
import { TaskSchema } from "../validations/Task.validation.jsx";

//Api
import * as api from "../services/api"

export default function CreateTask() {
  
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TaskSchema()),
  });

  const onSubmit = (data) => {
    setButtonDisabled(true);
    const response = api.addTask(data);

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
      .then(() => {
        setButtonDisabled(false);
        navigate("/user/task");
      })
      .catch((err) => err);

  };
  return (
    <>
      <DefaltLayout>
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Create Task
            </h1>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="py-4">
              <form
                className="space-y-8 divide-y bg-white p-5 rounded-md shadow-xl divide-gray-200"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div className="space-y-6 sm:space-y-5">
                    <div className="space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Title
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                          <input
                            type="text"
                            {...register("title")}
                            id="title"
                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm"
                          />
                          {errors.title && (
                            <p className="mt-2 text-sm text-red-500">
                              {errors.title.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                            <label
                              htmlFor="Status"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Status
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                              <select
                                id="status"
                                className={`${
                                  errors.status
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                } block w-full max-w-lg rounded-md  shadow-sm sm:max-w-xs sm:text-sm`}
                                {...register("status")}
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Choose Status
                                </option>

                                
                                <option value="pending">
                                     Pending
                                    </option>

                                    <option value="completed">
                                     Completed
                                    </option>
                                  
                              </select>

                              {errors.status && (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id="email-error"
                                >
                                  {errors.status.message}
                                </p>
                              )}
                            </div>
                          </div>

                      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Description
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                          <textarea
                            id="description"
                            {...register("description")}
                            rows={3}
                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            defaultValue={""}
                          />
                          {errors.description && (
                            <p className="mt-2 text-sm text-red-500">
                              {errors.description.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <Link
                      to={buttonDisabled ? `#` : "/user/task"}
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </Link>
                    <button
                          disabled={buttonDisabled}
                          type="submit"
                          className={`${
                            buttonDisabled
                              ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                              : "bg-gray-800 hover:bg-gray-900"
                          } ml-3 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
                        >
                          Create Task
                        </button>
                  </div>
                </div>
              </form>
            </div>
            {/* /End replace */}
          </div>
        </div>
      </DefaltLayout>
    </>
  );
}
