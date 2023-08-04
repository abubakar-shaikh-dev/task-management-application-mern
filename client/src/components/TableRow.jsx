import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import toast from "react-hot-toast";

//Api
import * as api from "../services/api";

export default function TableRow({ id, title, status,onTaskDelete }) {



  const [deleteId, setDeleteId] = useState(null);

  function handleDelete(id){
    setDeleteId(id)
  }

  function onCancel(){
    setDeleteId(null)
  }

  function onDelete(task_id){
    setDeleteId(null)
    const response = api.deleteTask(task_id);

    toast.promise(response, {
      loading: "Please wait...",
      success: (data)=>data.msg,
      error: (err)=>err.msg
    },
    {
      success:{
        duration:2000
      },
      error:{
        duration:1000
      }
    });

    response.then(()=>{
      onTaskDelete()
    })

  }

  function handleStatusChange(task_id){
    const response = api.markAsCompleted(task_id);

    toast.promise(response, {
      loading: "Please wait...",
      success: (data)=>data.msg,
      error: (err)=>err.msg
    },
    {
      success:{
        duration:2000
      },
      error:{
        duration:1000
      }
    });

    response.then(()=>{
      onTaskDelete()
    })
  }

  return (
    <>
    {deleteId&&<DeleteConfirmationModal id={deleteId} onDelete={onDelete} onCancel={onCancel} />}

      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {title}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {status}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <button
            type="button"
            className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={()=>handleStatusChange(id)}
          >
            Mark as Completed
          </button>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <Link
            to={`/user/task/show/${id}`}
            className="text-blue-600 hover:text-blue-900"
          >
            View
          </Link>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <Link
            to={`/user/task/edit/${id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </Link>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <a className="cursor-pointer text-red-600 hover:text-red-900" onClick={()=>handleDelete(id)}>
            Delete
          </a>
        </td>
      </tr>
    </>
  );
}
