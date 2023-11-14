import { useEffect, useState } from "react";
import { ToDoProvider } from "./context/Todo";

function App() {
  const [todos, setToDo] = useState([]); 

  const addToDo = (todo) => {
    setToDo((prev)=>[{id:Date.now(), ...todo}, ...prev])
  }
  const deleteToDo = (id) => {
    setToDo((prev)=> prev.filter((todo)=>todo.id !== id));
  }

  const updateToDo = (id, todo) =>{
    setToDo((prev)=>{
      return prev.map((prevTodo)=>{
        if(prevTodo.id === id){
          return todo;
        }else{
          return prevTodo;
        }
      });
    });
  }

  const toggleComplete = (id) =>{
    // setToDo((prev)=> prev.map((prevTodo)=> prevTodo === id ? {...prevTodo, completed : !prevTodo.completed}: prevTodo ));

    setToDo((prev) => {
      return prev.map((prevTodo)=>{
        if(prevTodo.id===id){
          return {...prevTodo, completed : !prevTodo.completed};
        }else{
         return prevTodo
        }
      })
    })
  }
  // getting teh data in local storage
  useEffect(()=>{
      const todos = JSON.parse(localStorage.getItem("todos"))

      if(todos && todos.length  >0){
        setToDo(todos);
      }
  },[])

  // Setting the data in local storage.
  useEffect(()=> {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <ToDoProvider value={{todos, addToDo, deleteToDo, toggleComplete, updateToDo}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center items-center relative mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">{/* Todo form goes here */}</div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
