import React, { useEffect, useState } from "react";
import DefaltLayout from "../components/layouts/DefaultLayout";
import { Link } from "react-router-dom";

//Api
import * as api from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    await api.getUserName().then((data) => {
      setUser(data.user.name);
    });
  }

  return (
    <>
      <DefaltLayout>
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome, {user && user}
            </h1>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="py-4 flex flex-col gap-1">
              <span className="mb-4">
                {" "}
                This is a Task Management Application, go to Tasks Tab to Get
                more details.
              </span>

              <div>
                <Link
                  to="/user/task"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto"
                >
                  My Tasks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DefaltLayout>
    </>
  );
}
