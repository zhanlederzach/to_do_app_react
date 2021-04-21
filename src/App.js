import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {

  const [tasks, setTasks] = useState(
    [{"text":"First Task", "day":"12.04.2021", "reminder": false, "id": 1},
    {"text":"Second Task", "day":"13.04.2021", "reminder": false, "id": 2},
    {"text":"Third Task", "day":"15.04.2021", "reminder": false, "id": 3}]
  )

  useEffect(() => {
    const getTasks = () => {
      setTasks(tasks)
    }

    getTasks()
  }, [])

  const addTask = (task) => {
    const id = tasks.length + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    const data = tasks.filter((task) => task.id !== id)
    setTasks(data)
  }

  // Toggle to change color
  const toggleReminder = (id) => {
    const taskToToggle = tasks.filter((item) => item.id === id)[0]
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    console.log(taskToToggle)
    console.log(updTask)
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: updTask.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {<AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'Sorry no tasks'
              )}
            </>
          )}
        />
      </div>
    </Router>
  )
}

export default App
