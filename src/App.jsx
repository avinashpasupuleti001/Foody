import './App.css'
import Header from './components/Header.jsx'
import Body from './components/Body.jsx'  
// import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import React ,{Suspense} from 'react'
import { createBrowserRouter, Outlet } from "react-router-dom"
// import Gocery from './components/Gocery.jsx'

const About = React.lazy(() => import('./components/About.jsx'));
const Gocery = React.lazy(() => import('./components/Gocery.jsx'));

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
        element: <Suspense fallback="Loading...">
          <About />
        </Suspense>,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/gocery",
        element: <Suspense fallback="Loading...">
          <Gocery />
        </Suspense>,
      },
    ],
  },
]);
export default appRouter;
