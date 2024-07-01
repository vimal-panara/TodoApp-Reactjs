import { useEffect, useState } from "react"
import Button from "./Components/Button/Button"
import Navbar from "./Components/Navbar/Navbar"
import Todo from "./Components/Todo/Todo"
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  uuid: string,
  description: string,
  isCompleted: boolean,
  isUpdated: boolean,
  parentUuid?: string
}

function App() {

  const [todo, setTodo] = useState("")

  const [todoList, setTodoList] = useState(Array<Todo>)

  const [isUpdate, setIsUpdate] = useState(false);

  const [parentUuid, setParentUuid] = useState('');

  const [todoUuidToUpdate, setTodoUuidToUpdate] = useState('')

  const [isShowCompleted, setIsShowCompleted] = useState(true)

  useEffect(() => {
    const localTodosList = localStorage.getItem("todos")
    if (localTodosList) {
      setTodoList(JSON.parse(localTodosList))
    }
  }, [])

  const SetToLocalStorage = (todos: Array<Todo>) => {
    console.log(todoList)
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const HandleAddTodo = () => {
    if (todo.trim().length <= 0) {
      alert("can not add empty todo")
    }
    else {
      let todos: Array<Todo>
      if (isUpdate) {
        todos = [...todoList, { uuid: uuidv4(), description: todo, isCompleted: false, isUpdated: false, parentUuid: parentUuid }]
        todos.forEach(x => {
          if (x.uuid == todoUuidToUpdate) {
            x.isUpdated = true
          }
        })
        setIsUpdate(false)
      }
      else {
        todos = [...todoList, { uuid: uuidv4(), description: todo, isCompleted: false, isUpdated: false }]
        setIsUpdate(false)
      }
      setTodoList(todos)
      setTodo("")
      setParentUuid('')
      SetToLocalStorage(todos)
    }
  }

  const HandleAddTodoEnter = (e: any) => {
    e.defaultPrevented
    if (e.key === 'Enter') {
      return HandleAddTodo()
    }
  }

  const handleChecked = (e: any) => {
    todoList.forEach(x => {
      if (x.uuid === e.target.name) {
        x.isCompleted = !x.isCompleted
      }
    })
    let todos = [...todoList]
    setTodoList(todos)
    SetToLocalStorage(todos)
  }

  const handleDelete = (uuid: string) => {
    let newTodos = todoList.filter(item => item.uuid !== uuid);
    setTodoList(newTodos)
    SetToLocalStorage(newTodos)
  }

  const handleEdit = (uuid: string) => {
    setIsUpdate(true)
    let uuidToUpdate = uuid
    setTodoUuidToUpdate(uuidToUpdate);
    const oldTodo = todoList[todoList.findIndex(x => x.uuid === uuidToUpdate)]
    setTodo(oldTodo.description)
  }

  const ClearAllTodos = () => {
    setTodoList([])
    SetToLocalStorage([])
  }

  return (
    <>
      <div className="bg-violet-200">
        <Navbar />
        <div className="min-h-screen p-3 mx-auto my-2 text-black container bg-violet-100 rounded-xl max-w-[75%]">
          <div className="addTodo">
            <div className="flex justify-center">
              <h2 className="font-bold font-lg">TODO app by VP</h2>
            </div>
            <div className="todo flex justify-center gap-[5px] my-5">
              <input
                type="text"
                className="md:w-1/4 border-violet-500 rounded-md border-[2px]"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={HandleAddTodoEnter}
              />
              <Button title={isUpdate ? "Update" : "Add"} handler={HandleAddTodo} />
              <Button title="Clear All Todos" handler={ClearAllTodos} />
            </div>
          </div>
          <div className="todos">
            <div className="todoHeading my-[30px] flex justify-center gap-10 items-center min-w-[50%]">
              <div className="justify-start">
                <h1 className="text-xl font-bold text-center">
                  {todoList.filter(x => {
                    if ((!x.isUpdated)) {
                      if (isShowCompleted) {
                        return true
                      } else {
                        if (!x.isCompleted) {
                          return true
                        }
                      }
                    }
                    return false
                  }).length > 0 ? 'Your TODOs' : 'No TODOs to Display'}
                </h1>
              </div>
              <div className="justify-end">
                <input id="ShowCompletedCheckBox" type="checkbox" checked={isShowCompleted} onChange={() => setIsShowCompleted(!isShowCompleted)} />
                <label htmlFor="ShowCompletedCheckBox" className="select-none"> Show Completed</label>
              </div>
            </div>
            <div className="flex flex-wrap justify-center w-full overflow-hidden">
              {todoList.map((item) => {
                if ((!item.isUpdated)) {
                  if (isShowCompleted) {
                    return <Todo key={item.uuid} uuid={item.uuid} description={item.description} isCompleted={item.isCompleted} handleChecked={handleChecked} handleDelete={handleDelete} handleEdit={handleEdit} />
                  } else {
                    if (!item.isCompleted) {
                      return <Todo key={item.uuid} uuid={item.uuid} description={item.description} isCompleted={item.isCompleted} handleChecked={handleChecked} handleDelete={handleDelete} handleEdit={handleEdit} />
                    }
                  }
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
