import React, { useState } from 'react';
import TodoForm from './TodoForm';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
//import { RiCloseCircleLine } from 'react-icons/ri';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
//import { TiEdit } from 'react-icons/ri';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value,edit.sdate);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <CancelOutlinedIcon
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <EditOutlinedIcon
          onClick={() => setEdit({ id: todo.id, value: todo.text})}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;
