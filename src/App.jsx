import { useState, useRef, useEffect } from "react";
import Form from "./componets/Form";
import TaskBox from "./componets/TaskBox";

function App() {
  const [isFormShow, setIsFormShow] = useState(false);
  const [isFilterBtnShow, setIsFilterBtnShow] = useState(true);
  const [editTaskId, setEditTaskId] = useState(null);

  const [filter, setFilter] = useState("");
  const filterRef = useRef(""); // for the perfomance we use useRef which will not rerender when it store the value;
  

  // toogle for form
  const showForm = () => {
    setIsFormShow(!isFormShow);
    setIsFilterBtnShow(!isFilterBtnShow);
  };

  // task array where all listed task will show
  const [task, setTask] = useState(loadTasks());

  // completed tasks
  const completedTaskLog = useRef([]);

  // add the task
  const addTask = (newTask) => {
    setTask((prevTask) => [...prevTask, { ...newTask, id: Date.now() }]);
    setIsFormShow(!isFormShow);
    setIsFilterBtnShow(!isFilterBtnShow);
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
    completedTaskLog.current.push(completedtaskId);
  };

  // edit the task
  const editTask = (taskId) => {
    setEditTaskId(taskId);
    setIsFormShow(true);
    setIsFilterBtnShow(!isFilterBtnShow);
  };

  // update the edit one to task array
  const updateTask = (updateTask) => {
    setTask((prevTask) =>
      prevTask.map((task) =>
        task.id === updateTask.id ? { ...task, ...updateTask } : task
      )
    );
    setEditTaskId(null);
    setIsFormShow(false);
    setIsFilterBtnShow(!isFilterBtnShow);
  };

  const filterBycategory = (e) => {
    // where directly set the category to the state we store it in reference and ensure that it is not repated category we update to state and rerender will happens
    const newFilter = e.target.value;
    if (newFilter !== filterRef.current) {
      filterRef.current = newFilter;
      setFilter(filterRef.current);
    }
    // where combing the useState and useRef will improve the performance
  };

 // Load tasks from localStorage on page load
 function loadTasks(){
  const savedTasks = JSON.parse(localStorage.getItem("task"));
  return savedTasks ? savedTasks : [];
};

// add the task when the task state is updated 
useEffect(() => {
  localStorage.setItem("task", JSON.stringify(task));
}, [task]);

  return (
    <div className="task-container">
      <h1>Tasks</h1>

      { isFilterBtnShow &&
        <div className="filter">
        category : 
        <select
          name="filterOption"
          id="filterOption"
          onChange={filterBycategory}
        >
          <option value="">all</option>

          {[...new Set(task.map((t) => t.category))].filter(category => category.trim() !== "").map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      }
      
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

      {!isFormShow && 
        <button className="btn btn-primary addTaskBtn" onClick={showForm}>
          Add Task
        </button>
      }
    </div>
  );
}

export default App;
