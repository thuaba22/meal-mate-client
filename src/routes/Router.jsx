import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals/Meals";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MealDetails from "../pages/MealDetails/MealDetails";
import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/meals",
        element: <Meals></Meals>,
      },
      {
        path: "/upcomingMeals",
        element: <UpcomingMeals></UpcomingMeals>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/meal/:mealId",
        element: (
          <PrivateRoute>
            <MealDetails></MealDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/meals/${params.mealId}`),
      },
    ],
  },
]);

export default Router;
