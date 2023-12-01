import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Meals from "../pages/Meals/Meals";
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MealDetails from "../pages/MealDetails/MealDetails";
import PrivateRoute from "./PrivateRoute";
import CheckOut from "../pages/CheckOut/CheckOut";
import Dashboard from "../layouts/Dashboard";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import MyRequestMeal from "../pages/Dashboard/MyRequestMeal/MyRequestMeal";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile/AdminProfile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AddMeal from "../pages/Dashboard/Admin/AddMeal/AddMeal";
import AllMeal from "../pages/Dashboard/Admin/AllMeal/AllMeal";
import UpdateMeal from "../pages/Dashboard/Admin/UpdateMeal/UpdateMeal";
import ServeMeals from "../pages/Dashboard/Admin/ServeMeals/ServeMeals";
import UpcomingAdmin from "../pages/Dashboard/Admin/UpcomingAdmin/UpcomingAdmin";
import Error from "../pages/ErrorPage/ErrorPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
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
        path: "/checkout/:packagesId",
        element: (
          <PrivateRoute>
            <CheckOut></CheckOut>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/premium/${params.packagesId}`),
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

  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/admin-profile",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "/dashboard/add-meal",
        element: <AddMeal></AddMeal>,
      },
      {
        path: "/dashboard/all-meals",
        element: <AllMeal></AllMeal>,
      },
      {
        path: "/dashboard/update-meal/:mealId",
        element: <UpdateMeal></UpdateMeal>,
      },
      {
        path: "/dashboard/serve-meals",
        element: <ServeMeals></ServeMeals>,
      },
      {
        path: "/dashboard/upcoming-meals",
        element: <UpcomingAdmin></UpcomingAdmin>,
      },
      {
        path: "/dashboard/requested-meals",
        element: <MyRequestMeal></MyRequestMeal>,
      },
      {
        path: "/dashboard/my-reviews",
        element: <MyReviews></MyReviews>,
      },
    ],
  },
]);

export default Router;
