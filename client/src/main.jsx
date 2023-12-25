import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'

const router = createBrowserRouter([
  {
  // main.jsx is the parent, app.jsx is the first component child to be rendered on the rootpage (default page in the path:'/',)
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchBooks />
      }, {
        path: '/saved',
        element: <SavedBooks />
      }
    ]
  }
])

// creates root with createRoot method (), creates a root where you can render out react elements specefied with the HTML empty div w/ the id="root", this will render where specified in the index HTML for the user.
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
