import AddIcon from './AddIcon';
import classes from './AddToDo.module.css';
import { useState } from 'react';

const AddToDo = (props) => {
  const [enteredText, setEnteredText] = useState('');
  const [enteredDuedate, setEnteredDuedate] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    props.onAddTodo({
      content: enteredText,
      duedate: enteredDuedate || null,
    });

    setEnteredText('');
    setEnteredDuedate('');
  };

  const textEnteredHandler = (event) => {
    setEnteredText(event.target.value);
  };

  const duedateEnteredHandler = (event) => {
    setEnteredDuedate(event.target.value);
  };

  return (
    <div className={classes['addtodo-container']}>
      <figure className={classes['addtodo']}>
        <form
          id="todoform"
          onSubmit={submitHandler}
          className={classes['addtodo--form']}
        >
          <input
            type="text"
            className={classes['addtodo--text']}
            placeholder="What To Do?"
            required
            value={enteredText}
            onChange={textEnteredHandler}
          ></input>

          <label htmlFor="duedate" className={classes['addtodo--label']}>
            Due date (not required)
          </label>
          <input
            type="date"
            id="duedate"
            className={classes['addtodo--duedate']}
            value={enteredDuedate}
            onChange={duedateEnteredHandler}
          ></input>
        </form>
        <button
          form="todoform"
          type="submit"
          className={classes['addtodo--button']}
        >
          <AddIcon />
        </button>
      </figure>
    </div>
  );
};

export default AddToDo;
