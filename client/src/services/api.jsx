import axios from "axios";

export async function addTask(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`/task/new`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}

export async function editTask(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`/task/${data._id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}

export async function getUserTasks() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}

export async function getTask(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(
      "Error while fetching particular post data using GET API method: " + err
    );
  }
}

export async function deleteTask(task_id) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`/task/${task_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}

export async function markAsCompleted(task_id) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(`/task/${task_id}`,null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}

export async function getUserName() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    const errorMsg = error.response ? error.response.data.msg : error.message;
    return Promise.reject({ msg: errorMsg });
  }
}