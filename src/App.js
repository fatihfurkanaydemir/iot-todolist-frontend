import { useEffect, useState } from 'react';

import './App.css';
import AddToDo from './components/AddToDo/AddToDo';
import MainContainer from './components/MainContainer/MainContainer';
import ToDoList from './components/ToDoList/ToDoList';

function App() {
  const [todoList, setTodoList] = useState([]);

  // Fetch ToDo list when app is first ran
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:80/api/v1/todos');
        if (!response.ok) throw new Error('An error occured');

        const todos = (await response.json()).map((todo) => ({
          ...todo,
          duedate: todo.duedate ? new Date(todo.duedate) : '',
        }));

        setTodoList(todos);
      } catch (error) {
        throw error;
      }
    };

    getData();
  }, []);

  const addTodoHandler = async (todo) => {
    try {
      const response = await fetch('http://127.0.0.1:80/api/v1/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (!response.ok) throw new Error('ToDo could not be added');

      const returnedTodo = await response.json();
      console.log(returnedTodo);

      setTodoList((list) => [...list, returnedTodo]);
    } catch (error) {
      throw error;
    }
  };

  const deleteTodoHandler = async (id) => {
    try {
      const response = await fetch('http://127.0.0.1:80/api/v1/todos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });

      if (!response.ok) throw new Error('ToDo could not be deleted');

      setTodoList((list) => list.filter((todo) => todo.id !== id));
    } catch (error) {
      throw error;
    }
  };

  const markTodoHandler = async (id) => {
    try {
      const response = await fetch('http://127.0.0.1:80/api/v1/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });

      if (!response.ok) throw new Error('ToDo could not be marked');

      setTodoList((list) =>
        list.map((todo) => {
          if (todo.id === id)
            return { ...todo, isCompleted: !todo.isCompleted };
          else return todo;
        })
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="App">
      <MainContainer>
        <AddToDo onAddTodo={addTodoHandler} />
        <ToDoList
          todoList={todoList}
          onDeleteTodo={deleteTodoHandler}
          onMarkTodo={markTodoHandler}
        />
      </MainContainer>
    </div>
  );
}

export default App;
