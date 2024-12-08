import { useState } from "react";

export default function Form({ onAddTask, editTaskDetails, onEditTask }) {
  const [taskDetails, setTaskDetails] = new useState(
    editTaskDetails || {
      taskName: "",
      desc: "",
      category: "",
      date: "",
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
      date: "",
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
            name="date"
            id="task-date"
            value={taskDetails.date}
            onChange={handleFormInput}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          add task
        </button>
      </form>
    </>
  );
}
