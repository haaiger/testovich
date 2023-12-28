import React, { useReducer, useEffect, ChangeEvent, FormEvent } from "react";

import { tasksReducer } from "./useControl";

import { ITask } from "./interface";

function TaskList() {
  const [newTask, setNewTask] = React.useState("");
  const [tasks, dispatch] = useReducer(tasksReducer, [], () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /** Обработчик добавления задачи. */
  function handleAddtask(text: string) {
    dispatch({ type: "ADD_TASK", payload: text });
  }

  /** Обработчик переключения состояния задачи. */
  function toggleTask(id: number) {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  }

  /** Обработчик изменения значения input. */
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setNewTask(e.target.value);
  }

  /** Обработчик отправки формы. */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAddtask(newTask);
    setNewTask("");
  }

  return (
    <div>
      <h1>Чек-лист задач</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Введите новую задачу"
        />
        <button type="submit">Добавить</button>
      </form>
      <ul>
        {tasks.map((task: ITask) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
