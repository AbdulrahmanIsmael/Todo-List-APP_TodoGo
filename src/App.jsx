import { createContext, useState } from 'react';
import Welcome from './components/welcome/Welcome';
import Todo from './components/todo/Todo';
import Loading from './components/loading/Loading';

export const showContext = createContext();

export default function App() {
  const [show, setShow] = useState('welcome');

  const handleShowTodo = () => {
    setShow('loading');
    setTimeout(() => {
      setShow(() => 'todo');
    }, 2000);
  };

  return (
    <>
      {show === 'welcome' ? (
        <Welcome handleShowTodo={handleShowTodo} />
      ) : show === 'loading' ? (
        <Loading />
      ) : (
        <showContext.Provider value={setShow}>
          <Todo />
        </showContext.Provider>
      )}
    </>
  );
}
