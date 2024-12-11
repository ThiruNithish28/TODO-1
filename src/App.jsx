import { useState } from "react";
import Form from "./componets/Form";
import TaskBox from "./componets/TaskBox";

function App() {
  const [isFormShow, setIsFormShow] = new useState(false);
  const [editTaskId, setEditTaskId] = new useState(null);
  const [filter, setFilter] = new useState("");

  // toogle for form
  const showForm = () => {
    setIsFormShow(!isFormShow);
  };

  // task array where all listed task will show
  const [task, setTask] = new useState([]);

  // completed tasks
  const [completedTask, setCompletedTask] = new useState([]);

  // add the task
  const addTask = (newTask) => {
    setTask((prevTask) => [...prevTask, { ...newTask, id: Date.now() }]);
    setIsFormShow(!isFormShow);
  };

  //delete the task
  const deleteTask = (taskId) => {
    setTask((pre) => pre.filter((task) => task.id !== taskId));
  };

  // for task completed
  const taskCompleted = (completedtaskId) => {
    setTask((prevTask) =>
      prevTask.map((t) =>
        t.id === completedtaskId ? { ...t, isCompleted: true } : t
      )
    );
    console.log("completed..");
  };
  // edit the task
  const editTask = (taskId) => {
    setEditTaskId(taskId);
    setIsFormShow(true);
  };
  // update the edit one to task array
  const updateTask = (updateTask) => {
    setTask((prevTask) =>
      prevTask.map((task) =>
        task.id === updateTask.id ? { ...task, ...updateTask } : task
      )
    );
    setIsFormShow(false);
  };

  const filterByCatorgy=(e)=>{
    console.log(e.target.value);
    setFilter(e.target.value);
  }
  return (
    <div className="task-container">
      <h1>Tasks</h1>

      <div className="filter">
        <select name="filterOption" id="filterOption" onChange={filterByCatorgy}>
          <option value="">select the category</option>
          {
            [...new Set(task.map(t=> t.category))].map(catorgy=>
              <option key={catorgy} value={catorgy}>{catorgy}</option>
            )
          }
        </select>
      </div>

      {isFormShow ? (
        <Form
          onAddTask={addTask}
          editTaskDetails={
            editTaskId ? task.find((t) => t.id === editTaskId) : null
          }
          onEditTask={updateTask}
        />
      ) : (
        <ul className="taskList d-flex flex-column">
        {task
          .filter((t) => filter === "" || t.category === filter)
          .map((task) => (
            <li key={task.id}>
              <TaskBox
                task={task}
                onDelete={deleteTask}
                onCompleted={taskCompleted}
                onEdit={editTask}
              />
            </li>
          ))}
      </ul>
      )}

      {!isFormShow ? (
        <button className="btn btn-primary addTaskBtn" onClick={showForm}>
          Add Task
        </button>
      ) : (
        " "
      )}
    </div>
  );
}

export default App;
