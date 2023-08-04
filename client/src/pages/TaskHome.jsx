import React, { useEffect, useState } from "react";
import DefaltLayout from "../components/layouts/DefaultLayout";
import { Link } from "react-router-dom";
import TableRow from "../components/TableRow";

//Api
import * as api from "../services/api";

export default function TaskHome() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    await api.getUserTasks().then((data) => {
      setTasks(data.tasks);
    });
  }

  function onTaskDelete() {
    getTasks();
  }

  return (
    <>
      <DefaltLayout>
        <div className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16">
                <Link
                  to="/user/task/new"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto"
                >
                  Create Task
                </Link>
              </div>
            </div>

            {tasks?.length === 0 ? (
              <div className="p-20 flex justify-center w-full">
                <h1 className="text-2xl font-bold">No Tasks Available</h1>
              </div>
            ) : (
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                            >
                              Task
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                              Action
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                              View
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                              Edit
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {tasks?.map((task) => (
                            <TableRow
                              key={task._id}
                              id={task._id}
                              title={task.title}
                              status={task.status}
                              onTaskDelete={onTaskDelete}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DefaltLayout>
    </>
  );
}
