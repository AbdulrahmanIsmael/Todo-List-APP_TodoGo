import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import { showContext } from '../../../../App';

export default function Navbar() {
  const setShow = useContext(showContext);
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header id='todo'>
      <nav className='todo__nav'>
        <Link to='/' className='todo__nav__brand'>
          TodoGo
        </Link>

        <div className='todo__nav__user'>
          <h2>{user.name}</h2>
          <p>Points: {user.points}</p>
        </div>

        <button className='todo__nav__quit' onClick={() => setShow('welcome')}>
          Quit
        </button>
      </nav>
    </header>
  );
}
