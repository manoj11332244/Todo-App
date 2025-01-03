import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './pages/Navbar'
import Home from './pages/Home'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
])

function App() {

  return (
   <RouterProvider router={appRouter}/>
  )
}

export default App
