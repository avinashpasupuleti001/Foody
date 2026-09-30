import './App.css'
import Header from './components/Header.jsx'
import Body from './components/Body.jsx'  
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import { createBrowserRouter, Outlet } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet/>
    </div>
  )
}
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);
export default appRouter;
