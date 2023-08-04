import React, { useState,useEffect } from "react";
import DefaltLayout from "../components/layouts/DefaultLayout";
import { Link , useParams} from "react-router-dom";

//Api
import * as api from "../services/api"

export default function ViewTask() {
  const { id } = useParams();
  const [task,setTask] = useState(null)

  useEffect(() => {
    getTask();
  }, []);

  async function getTask() {
    await api.getTask(id).then((data) => {
      setTask(data.task)
    });
  }

  return (
    <>
      <DefaltLayout>
        <div className="p-6">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Task Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                See details of Task.
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Title</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {task?.title}
                  </dd>
                </div>

                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {task?.status}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {task?.description}
                  </dd>
                </div>
                <div className="p-5">
                  <div className="flex justify-end">
                    <Link
                      to="/user/task"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Go Back
                    </Link>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </DefaltLayout>
    </>
  );
}
