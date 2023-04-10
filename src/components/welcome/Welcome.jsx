import { useState } from 'react';
import './welcome.scss';

export default function Welcome({ handleShowTodo }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const initialTasks = [
    {
      task: 'Congratulations, now get your first point!',
      info: 'Thanks for using our website, we hope it help you to achieve all what you need in your day, now mark this task as done to get your first point!',
      importance: true,
      expand: true,
      edit: false,
    },
  ];

  if (!localStorage.getItem('tasks'))
    localStorage.setItem('tasks', JSON.stringify(initialTasks));

  const handleStart = () => {
    if (username) {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        localStorage.setItem(
          'user',
          JSON.stringify({ name: username, points: 0 })
        );

        handleShowTodo();
      } else {
        if (username !== user.name) {
          setUsername('');
          setError('Enter the right username!');
        } else {
          handleShowTodo();
        }
      }
    } else {
      setError('Enter the username first!');
    }
  };

  function handleReset() {
    localStorage.removeItem('user');
    localStorage.setItem('tasks', JSON.stringify(initialTasks));
    document.getElementById('username').placeholder = 'Enter A New Username...';
    setMsg('user is reset successfully, you can enter new username now!');
    setShowMsg(true);

    setTimeout(() => {
      setShowMsg(false);
    }, 2300);
  }

  function checkUser() {
    if (localStorage.getItem('user')) {
      return 'Enter The Username...';
    }

    return 'Enter A New Username...';
  }

  return (
    <section id='welcome__section'>
      <div className='welcome__section__heading'>
        <h1>Welcome To TodoGo</h1>
        <p>We Are Here To Achieve Your Goals!</p>
      </div>

      <input
        type='text'
        name='username'
        id='username'
        value={username}
        onChange={e => setUsername(e.target.value)}
        onKeyUp={e => {
          if (e.key === 'Enter') handleStart();
        }}
        placeholder={error || checkUser()}
        style={{
          border: error !== '' && '2px solid #ff0000',
        }}
      />
      <button className='welcome__section__startBtn' onClick={handleStart}>
        Start Now
      </button>

      <button className='welcome__section__reset' onClick={handleReset}>
        Reset
      </button>

      <div
        className={
          showMsg
            ? 'welcome__section__msg welcome__section__msg--show'
            : 'welcome__section__msg'
        }
      >
        {msg}
      </div>
    </section>
  );
}
