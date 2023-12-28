import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx'
// import SearchBooks from './pages/SearchBooks'
// import SavedBooks from './pages/SavedBooks'
import Signup from './components/Signup.jsx'
import LoginForm from './components/LoginForm.jsx'
import SearchRecipes from './pages/SearchRecipes.jsx'
import RecipeDetails from './pages/RecipeDetails.jsx'
import SavedMeals from './pages/SavedMeals.jsx'
import Account from './pages/Account.jsx'
import Donations from './components/Donations.jsx'

const router = createBrowserRouter([
  {
    // main.jsx is the parent, app.jsx is the first component child to be rendered on the rootpage (default page in the path:'/',)
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchRecipes />
      }, {
        path: '/registration',
        element: <Signup />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/recipedetails/:id',
        element: <RecipeDetails />
      },
      {
        path: '/savedmeals',
        element: <SavedMeals />
      },
      {
        path: '/account',
        element: <Account />
      },
      {
        path: '/donations',
        element: <Donations />
      },
    ]
  }
])

// creates root with createRoot method (), creates a root where you can render out react elements specefied with the HTML empty div w/ the id="root", this will render where specified in the index HTML for the user.
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
