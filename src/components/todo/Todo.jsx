import { useEffect, useReducer, useState } from 'react';
import './todo.scss';
import Navbar from './components/navbar/Navbar';
import TodoForm from './components/todoForm/TodoForm';
import TodoList from './components/todoList/TodoList';

const reducer = (initialTasks, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...initialTasks,
        {
          ...action.inputs,
          expand: false,
          edit: false,
          importance: action.importance,
        },
      ];
    case 'edit':
      return initialTasks.map((task, index) => {
        if (index === action.index) {
          return { ...task, edit: true, expand: true };
        } else {
          return task;
        }
      });
    case 'expand':
      return initialTasks.map((task, index) => {
        if (index === action.index) {
          return { ...task, expand: !task.expand };
        } else {
          return task;
        }
      });
    case 'send':
      return initialTasks.map((task, index) => {
        if (index === action.index) {
          return { ...task, edit: false };
        } else {
          return task;
        }
      });
    case 'delete':
      return initialTasks.filter((task, index) => index !== action.index);
    case 'done':
      return initialTasks.filter((task, index) => index !== action.index);
    case 'setEdit':
      return initialTasks.map((task, index) => {
        if (index === action.index) {
          return { ...task, [action.prop]: action.value };
        } else {
          return task;
        }
      });
    default:
      return initialTasks;
  }
};

export default function Todo() {
  const [doneMsg, setDoneMsg] = useState(false);
  const [tasks, updateTasks] = useState([]);

  const [newTasks, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('tasks'))
  );

  useEffect(() => {
    updateTasks(newTasks);
  }, [newTasks]);

  return (
    <>
      <Navbar />
      <TodoForm dispatch={dispatch} />
      <TodoList tasks={tasks} dispatch={dispatch} setDoneMsg={setDoneMsg} />

      <div className={doneMsg ? 'done__msg done__msg--show' : 'done__msg'}>
        Task Done!
      </div>
    </>
  );
}
