import { useState } from "react";

export default function Form({ onAddTask, editTaskDetails, onEditTask }) {
  const [taskDetails, setTaskDetails] = new useState(
    editTaskDetails || {
      taskName: "",
      desc: "",
      category: "",
      dueDate: "",
      dueTime:"",
      isCompleted: false,
    }
  );

  const handleFormInput = ({ target: { name, value } }) => {
    setTaskDetails((taskDetails) => ({ ...taskDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editTaskDetails) {
      onEditTask(taskDetails); // for edit task  
    } else {
      onAddTask(taskDetails); // for add task
    }
    setTaskDetails({
      taskName: "",
      desc: "",
      category: "",
      dueDate: "",
      dueTime:"",
      isCompleted: false
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="d-flex  align-items-center">
          <label>task name</label>
          <input
            type="text"
            name="taskName"
            id="task-name"
            required
            value={taskDetails.taskName}
            onChange={handleFormInput}
          />
        </div>

        <div className="d-flex  align-items-center">
          <label>details :</label>
          <input
            type="text"
            name="desc"
            id="desc"
            value={taskDetails.desc}
            onChange={handleFormInput}
          />
        </div>

        <div className="d-flex  align-items-center">
          <label>category:</label>
          <input
            type="text"
            name="category"
            id="task-category"
            value={taskDetails.category}
            onChange={handleFormInput}
          />
        </div>

        <div className="d-flex  align-items-center">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            id="task-date"
            value={taskDetails.dueDate}
            onChange={handleFormInput}
            required
          />
        </div>

        <div className="d-flex  align-items-center">
          <label>Due time:</label>
          <input
            type="time"
            name="dueTime"
            id="due-time"
            value={taskDetails.dueTime}
            onChange={handleFormInput}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
        {editTaskDetails ? "Update Task" : "Add Task"}
        </button>
      </form>
    </>
  );
}
