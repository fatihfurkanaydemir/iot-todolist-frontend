import classes from './ToDoElement.module.css';
import TrashIcon from './TrashIcon';
import CheckIcon from './CheckIcon';
import CompletedIcon from './CompletedIcon';
import React from 'react';

const ToDoElement = (props) => {
  const markButtonClasses =
    classes[
      props.isCompleted
        ? 'todo--button__unmark-completed'
        : 'todo--button__mark-completed'
    ];

  const textCompletedClasses = props.isCompleted
    ? classes['todo--completed-text']
    : '';

  return (
    <figure className={classes['todo-element']}>
      <div className={classes['todo--content']}>
        <p className={`${classes['todo--text']} ${textCompletedClasses} `}>
          {props.text}
        </p>
        {props.duedate && (
          <p className={`${classes['todo--duedate']} ${textCompletedClasses} `}>
            due: &nbsp;
            {props.duedate}
          </p>
        )}
      </div>
      <div className={classes['todo--buttons']}>
        <button
          type="button"
          onClick={props.onDelete.bind(null, props.id)}
          className={`${classes['todo--button']} ${classes['todo--button__delete']} `}
        >
          <TrashIcon />
        </button>
        <button
          type="button"
          onClick={props.onMark.bind(null, props.id)}
          className={`${classes['todo--button']} ${markButtonClasses} `}
        >
          {props.isCompleted ? <CompletedIcon /> : <CheckIcon />}
        </button>
      </div>
    </figure>
  );
};

export default React.memo(ToDoElement);
