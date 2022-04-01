import ToDoElement from '../ToDoElement/ToDoElement';
import classes from './ToDoList.module.css';

const dateFormatter = Intl.DateTimeFormat(navigator.language, {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  weekday: 'long',
});

const ToDoList = (props) => {
  const deleteHandler = (id) => {
    props.onDeleteTodo(id);
  };

  const markHandler = (id) => {
    props.onMarkTodo(id);
  };

  return (
    <div className={classes['todo-list']}>
      {props.todoList
        .slice()
        .sort((a, b) => (a.isCompleted ? 1 : -1))
        .map((todo) => (
          <ToDoElement
            key={todo.id}
            id={todo.id}
            text={todo.text}
            duedate={
              todo.duedate ? dateFormatter.format(new Date(todo.duedate)) : ''
            }
            isCompleted={todo.isCompleted}
            onMark={markHandler}
            onDelete={deleteHandler}
          />
        ))}
    </div>
  );
};

export default ToDoList;
