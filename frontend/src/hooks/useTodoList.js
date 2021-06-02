import { useState } from "react"; 

const useTodoList = () => {
  const [todoList, setTodoList] = useState([])

  const addItem = (task, priority) => {
    const item = {
      name: task,
      priority: priority
    }
    setTodoList([...todoList, item])
  }
  const deleteItem = (i) => {
    setTodoList(todoList.filter((_,index) => index!==i))
  }

  return {todoList, addItem, deleteItem};
};

export default useTodoList;