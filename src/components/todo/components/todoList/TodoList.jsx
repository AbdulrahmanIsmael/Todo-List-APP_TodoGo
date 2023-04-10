import './todoList.scss';
import TaskIcon from '@mui/icons-material/Task';
import GradeIcon from '@mui/icons-material/Grade';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TodoList({ tasks, dispatch }) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const tasksStorage = JSON.parse(localStorage.getItem('tasks'));

  function increasePoints() {
    const user = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem(
      'user',
      JSON.stringify({ ...user, points: user.points + 1 })
    );
  }

  const tasksList = tasksStorage.map((task, id) => {
    return (
      <li className='todo__list__item' key={id}>
        <div className='todo__list__item__heading'>
          <h4 className='flex__start__center'>
            {task.importance ? (
              <GradeIcon sx={{ fontSize: '2.5rem' }} />
            ) : (
              <TaskIcon sx={{ fontSize: '2.5rem' }} />
            )}
            {task.edit ? (
              <input
                type='text'
                id='new__task'
                value={task.task}
                onChange={e =>
                  dispatch({
                    type: 'setEdit',
                    index: id,
                    prop: 'task',
                    value: e.target.value,
                  })
                }
              />
            ) : (
              task.task
            )}
          </h4>

          <div>
            <DoneIcon
              sx={{ fontSize: '2.5rem', cursor: 'pointer' }}
              onClick={() => {
                increasePoints();
                dispatch({ type: 'done', index: id });
              }}
            />
            {task.edit ? (
              <SendIcon
                sx={{ fontSize: '2.5rem', cursor: 'pointer' }}
                onClick={() => dispatch({ type: 'send', index: id })}
              />
            ) : (
              <EditIcon
                sx={{ fontSize: '2.5rem', cursor: 'pointer' }}
                onClick={() => dispatch({ type: 'edit', index: id })}
              />
            )}

            <DeleteIcon
              sx={{ fontSize: '2.5rem', cursor: 'pointer' }}
              onClick={() => dispatch({ type: 'delete', index: id })}
            />
            <ExpandMoreIcon
              sx={{ fontSize: '2.5rem', cursor: 'pointer' }}
              onClick={() => dispatch({ type: 'expand', index: id })}
            />
          </div>
        </div>

        {task.expand && (
          <div className='todo__list__item__info'>
            {task.hour &&
              task.min &&
              task.timeline &&
              (task.edit ? (
                <div className='edit__time'>
                  <input
                    type='number'
                    name='hour'
                    id='new__hour'
                    min='1'
                    max='12'
                    value={task.hour}
                    onChange={e =>
                      dispatch({
                        type: 'setEdit',
                        index: id,
                        prop: 'hour',
                        value: e.target.value,
                      })
                    }
                    placeholder='hh'
                  />
                  :
                  <input
                    type='number'
                    name='minute'
                    id='new__minute'
                    min='0'
                    max='59'
                    value={task.min}
                    onChange={e =>
                      dispatch({
                        type: 'setEdit',
                        index: id,
                        prop: 'min',
                        value: e.target.value,
                      })
                    }
                    placeholder='mm'
                  />
                  <select
                    name='timeline'
                    id='new__timeline'
                    onChange={e =>
                      dispatch({
                        type: 'setEdit',
                        index: id,
                        prop: 'timeline',
                        value: e.target.value,
                      })
                    }
                  >
                    <option value='AM'>AM</option>
                    <option value='PM'>PM</option>
                  </select>
                </div>
              ) : (
                <p id='time'>
                  {task.hour.length === 1 ? `0${task.hour}` : task.hour}:
                  {task.min.length === 1 ? `0${task.min}` : task.min}
                  {task.timeline}
                </p>
              ))}

            {task.info &&
              (task.edit ? (
                <textarea
                  id='new__info'
                  value={task.info}
                  onChange={e =>
                    dispatch({
                      type: 'setEdit',
                      index: id,
                      prop: 'info',
                      value: e.target.value,
                    })
                  }
                ></textarea>
              ) : (
                <p id='additions'>{task.info}</p>
              ))}
          </div>
        )}
      </li>
    );
  });

  return (
    <section id='todo__list'>
      <h3>My Tasks</h3>
      <ul>{tasksList}</ul>
    </section>
  );
}
