import { useState } from 'react';
import './todoForm.scss';
import todoLogo from '../../assets/images/todo logo.png';
import AddTaskIcon from '@mui/icons-material/AddTask';
import GradeIcon from '@mui/icons-material/Grade';

export default function TodoForm({ dispatch }) {
  const [inputs, setInputs] = useState({
    task: '',
    hour: '',
    min: '',
    timeline: 'AM',
    info: '',
  });
  const [importance, setImportance] = useState(false);

  function handleSetImportant() {
    setImportance(prevColor => !prevColor);
  }

  return (
    <div className='todo flex__between__center'>
      <form
        className='todo__form'
        onSubmit={e => {
          e.preventDefault();
          dispatch({ type: 'add', inputs: inputs, importance: importance });
        }}
      >
        <legend>
          <AddTaskIcon sx={{ fontSize: '40px', color: '#13315c' }} /> Add Task
        </legend>
        <input
          type='text'
          name='task'
          id='task'
          value={inputs.task}
          onChange={e => setInputs({ ...inputs, task: e.target.value })}
          placeholder='Enter the task here...'
          required
        />
        <fieldset className='todo__form__time'>
          <legend>HH:MM</legend>
          <input
            type='number'
            name='hour'
            id='hour'
            min='1'
            max='12'
            value={inputs.hour}
            onChange={e => setInputs({ ...inputs, hour: e.target.value })}
            placeholder='hh'
          />
          :
          <input
            type='number'
            name='minute'
            id='minute'
            min='0'
            max='59'
            value={inputs.min}
            onChange={e => setInputs({ ...inputs, min: e.target.value })}
            placeholder='mm'
          />
          <select
            name='timeline'
            id='timeline'
            value={inputs.timeline}
            onChange={e => setInputs({ ...inputs, timeline: e.target.value })}
          >
            <option value='AM'>AM</option>
            <option value='PM'>PM</option>
          </select>
        </fieldset>

        <textarea
          name='notes'
          id='notes'
          cols='30'
          rows='8'
          value={inputs.info}
          onChange={e => setInputs({ ...inputs, info: e.target.value })}
          placeholder='Additional Notes'
        ></textarea>

        <div className='todo__form__important' onClick={handleSetImportant}>
          <GradeIcon
            sx={{
              fontSize: '2.8rem',
              color: importance ? '#13315c' : '#999',
              cursor: 'pointer',
            }}
          />
          <h3>Important</h3>
        </div>

        <input type='submit' value='Add Task' id='add__task' />
      </form>

      <img src={todoLogo} alt='Todo Logo' className='todo__logo' />
    </div>
  );
}
